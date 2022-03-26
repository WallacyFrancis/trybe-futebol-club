import { Request, Response, NextFunction } from 'express';
import UserService from '../database/service/User';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const secret = fs.readFileSync('./jwt.evaluation.key', 'utf-8');

const messagesError = {
  tokenInvalid: { message: 'Invalid token '},
  tokenNull: { message: 'Token is required' },
};

export default class Token {
  private _email: string;
  private _token: string;

  constructor (email: string, token: string) {
    this._email = email;
    this._token = token;
  };

  static async decode(req: Request, res: Response) {
    try {
      const token: any = req.headers.authorization;
      const decode: any = await jwt.verify(token, secret);
      const user: any = await UserService.login(decode.email);
      res.status(200).send(user.role);
    } catch(e) {
      const { tokenInvalid } = messagesError;
      res.status(401).json(tokenInvalid);
    };
  }

  static requestToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token: any = req.headers.authorization;
      const { tokenNull } = messagesError;
      if (!token) return res.status(401).json(tokenNull)
      next()
    } catch (e) {
      const { tokenNull } = messagesError;
      res.status(401).json(tokenNull)
    }
  }

  static verifyToken(req: Request, res: Response, next: NextFunction) {
    const { tokenNull } = messagesError;
    try {
      const token = req.headers.authorization;
      if (!token) return res.status(401).json(tokenNull)
      next()
    } catch (e) {
      console.log(e);
    }
  }

}