import { Request, Response } from 'express';
import MatchService from '../service/Match';

export default class Match {
  static async findAll(_req: Request, res: Response) {
    const matchs = await MatchService.findAll();
    res.status(200).send(matchs)
  };
}