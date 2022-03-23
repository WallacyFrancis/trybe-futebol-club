import { Request, Response } from 'express';
import UserService from '../service/User';
import * as jwt from 'jsonwebtoken';

const secret = process.env.SECRET || '1234';

export default class User {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserService.login(email, password);
    const token = jwt.sign({ email }, secret)
    res.status(200).json({ user, token })
  }

  static async loginValidate(req: Request, res: Response) {
    const token = req.headers.authorization
    if (!token) return res.status(200).json({ message: 'Request with login' })
    res.status(200).send('admin');
  }
}