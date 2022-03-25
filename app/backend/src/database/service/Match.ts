import MatchModel from '../models/Match';
import ClubModel from '../models/Club';
import IMatch from '../../interfaces/Match';

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

  static async create(matchs: IMatch) {
    const match = await MatchModel.create(matchs);
    return match;
  }
};
