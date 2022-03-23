import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import IToken from '../interfaces/Token';

const secret = process.env.SECRET || '1234';

const messagesError = {
  tokenInvalid: { message: 'Invalid token '},
};

export default class Token {
  private _email: string;
  private _token: string

  constructor (email: string, token: string) {
    this._email = email;
    this._token = token;
  }

  static decode(req: Request, res: Response, next: NextFunction) {
    try {
      const token: any = req.headers.authorization;
    const decode: IToken | any = jwt.verify(token, secret)
    if (decode.email === 'admin@admin.com') return next();
    } catch(e) {
      const { tokenInvalid } = messagesError;
      res.status(401).json(tokenInvalid);
    }
    
  }


}