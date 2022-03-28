import MatchModel from '../models/Match';
import ClubModel from '../models/Club';
import { IMatch, OutMatch } from '../../interfaces/Match';

export default class Match {
  static async findAll() {
    const matchs: any = await MatchModel.findAll({
      include: [
        { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return matchs;
  };

  static async getInProgress(inProgress: boolean) {
    const matchs = await MatchModel.findAll({
      where: { inProgress },
      include: [
        { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return matchs;
  };

  static async create(matchs: IMatch): Promise<OutMatch> {
    const match = await MatchModel.create(matchs);
    return match;
  }

  static async updateFinish(id: number) {
    await MatchModel.update(
      { inProgress: false },
      { where: { id }},
    );

    const match = await MatchModel.findByPk(id)
    return match;
  }

  static async update(homeTeamGoals: number, awayTeamGoals: number, id: number) {
    await MatchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id }},
    );
    const match = MatchModel.findByPk(id);
    return match;
  }
};
