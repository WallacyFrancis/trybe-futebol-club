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

  static async create(req: Request, res: Response) {
    const match = await MatchService.create(req.body);
    res.status(201).json(match);
  };

  static async updateFinish(req: Request, res: Response) {
    const { id } = req.params;
    const match = await MatchService.updateFinish(Number(id));
    res.status(200).json(match);
  };

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const match = MatchService.update(homeTeamGoals, awayTeamGoals, Number(id))
    res.status(200).json(match);
  }
};
