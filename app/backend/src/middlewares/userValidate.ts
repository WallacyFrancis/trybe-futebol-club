import { Request, Response, NextFunction } from 'express';
import UserService from '../database/service/User';

const messagesError = {
  fieldsTest: { message: 'All fields must be filled' },
  userNotFound: { message: 'Incorrect email or password' },
};

const bcrypt  = require('bcryptjs');

export default class UserValidate {
  static fieldsNull(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const { fieldsTest } = messagesError;
    if (!email) return res.status(401).json(fieldsTest);
    if (!password) return res.status(401).json(fieldsTest);
    next();
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { userNotFound } = messagesError;
    try {
      const { email, password } = req.body;
      const user: any = await UserService.getPassword(email);
      const bcryptCompare = bcrypt.compareSync(password, user.password);
      if (!bcryptCompare) return res.status(401).json(userNotFound);
      next();
    } catch (e) {
      console.log(e);
      res.status(401).json(userNotFound);
    };
  }
}