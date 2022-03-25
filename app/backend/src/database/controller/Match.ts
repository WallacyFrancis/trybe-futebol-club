import { Request, Response } from 'express';
import MatchService from '../service/Match';

export default class Match {
  static async findAll(req: Request, res: Response) {
    const { inProgress } = req.query as unknown as { inProgress: string };
    let matchs;
    switch (inProgress) {
      case 'true':
        matchs = await MatchService.getInProgress(true);
        break;
      case 'false':
        matchs = await MatchService.getInProgress(false);
        break;
      default:
        matchs = await MatchService.findAll();
        break;
    }
    res.status(200).json(matchs);
  };
};
