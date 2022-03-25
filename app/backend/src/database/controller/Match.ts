import { Request, Response } from 'express';
import MatchService from '../service/Match';

export default class Match {
  static async findAll(req: Request, res: Response) {
    const { inProgress } = req.query as unknown as { inProgress: string };
    let matchs;
    if (inProgress) {
      matchs = await MatchService.getInProgress(inProgress);
      console.log(matchs);
    } else {
      matchs = await MatchService.findAll();
    }
    res.status(200).send(matchs)
  };
};
