import { Request, Response, NextFunction } from 'express';
import UserService from '../database/service/User';

const messagesError = {
  fieldsTest: { message: 'All fields must be filled' },
  userNotFound: { message: 'Incorrect email or password' },
};

export default class UserValidate {
  static email(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const { fieldsTest } = messagesError;
    if (!email) return res.status(401).json(fieldsTest);
    next();
  }
  
  static password(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    const { fieldsTest } = messagesError;
    if (!password) return res.status(401).json(fieldsTest);
    next();
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const { userNotFound } = messagesError
    const user = await UserService.login(email);
    if (!user) return res.status(401).json(userNotFound);
    next();
  }
}