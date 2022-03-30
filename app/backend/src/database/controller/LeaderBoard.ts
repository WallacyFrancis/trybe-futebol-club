import { Request, Response } from 'express';
import LeaderBoardHome from '../service/LeaderBoardsHome';

export default class LeaderBoard {
  static async getHome(_req: Request, res: Response) {
    const matchs = await LeaderBoardHome.getTeamHome();
    res.status(200).json(matchs);
  }
};