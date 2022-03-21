import { Request, Response } from 'express';
import * as UserService from '../service/User';
import * as jwt from 'jsonwebtoken';

const secret = process.env.SECRET || '1234';

export default class User {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserService.login(email, password);
    const token = jwt.sign({ email }, secret)
    res.status(200).json({ user, token })
  } 
}