import { Request, Response } from 'express';
import UserService from '../service/User';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const secret = fs.readFileSync('./jwt.evaluation.key', 'utf-8');

export default class User {
  static async login(req: Request, res: Response) {
    const { email } = req.body;
    const user = await UserService.login(email);
    const token = jwt.sign({ email }, secret)
    res.status(200).json({ user, token })
  }
};