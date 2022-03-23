import { Request, Response } from 'express';
import ClubService from '../service/Club';

export default class Club {
  static async findAll(_req: Request, res: Response) {
    const clubs = await ClubService.findAll();
    res.status(200).send(clubs);
  };

  static async findByPk(req: Request, res: Response) {
    const { id } = req.params;
    const club = await ClubService.findByPk(Number(id));
    res.status(200).json(club)
  };
}