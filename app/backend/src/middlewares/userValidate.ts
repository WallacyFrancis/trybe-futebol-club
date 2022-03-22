import { Request, Response, NextFunction } from 'express';
import UserService from '../database/service/User';

const messagesError = {
  emailEmpty: { message: 'Email is not empty' },
  passwordEmpty: { message: 'Password is not empty' },
  userNotFound: { message: 'Incorrect email or password' }
};

export default class UserValidate {
  static email(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const { emailEmpty } = messagesError;
    if (!email) return res.status(400).json(emailEmpty);
    next();
  }
  
  static password(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    const { passwordEmpty } = messagesError;
    if (!password) return res.status(400).json(passwordEmpty);
    next();
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const { userNotFound } = messagesError
    const user = await UserService.login(email, password);
    if (!user) return res.status(400).json(userNotFound)
    next();
  }
}