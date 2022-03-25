import { Request, Response, NextFunction } from 'express';
import UserService from '../database/service/User';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';


const bcrypt  = require('bcryptjs');
const secret = fs.readFileSync('./jwt.evaluation.key', 'utf-8');

const messagesError = {
  tokenInvalid: { message: 'Invalid token '},
  userNotFound: { message: 'Incorrect email or password' },
};

export default class Token {
  private _email: string;
  private _token: string;

  constructor (email: string, token: string) {
    this._email = email;
    this._token = token;
  };

  static async decode(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body
      const token: any = req.headers.authorization;
      const user: any = await UserService.login(email);
      const decode: any = await jwt.verify(token, secret);
    if (decode.email === user.email) return next();
    } catch(e) {
      const { tokenInvalid } = messagesError;
      res.status(401).json(tokenInvalid);
    };
  }

  static async crypt(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user: any = await UserService.login(email);
      const bcryptCompare = bcrypt.compareSync(password, user.password);
      const { userNotFound } = messagesError;
      if (bcryptCompare) return next();
      res.status(400).json(userNotFound);
    } catch (e) {
      console.log(e);
    };
  }
}