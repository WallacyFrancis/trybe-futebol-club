import { Request, Response } from 'express';
import LeaderBoardHome from '../service/LeaderBoardsHome';
import LeaderBoardAway from '../service/LeaderBoardsAway';

export default class LeaderBoard {
  static async getHome(_req: Request, res: Response) {
    const matchs = await LeaderBoardHome.getTeamHome();
    res.status(200).json(matchs);
  }

  static async getAway(_req: Request, res: Response) {
    const matchs = await LeaderBoardAway.getTeamAway();
    res.status(200).json(matchs);
  }
};