import MatchModel from '../models/Match';
import ClubModel from '../models/Club';

export default class Match {
  static async findAll() {
    const matchs: any = await MatchModel.findAll({
      include: [
        { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return matchs;
  }
};

// homeClub: await this.getHomeTeam(Number(match.dataValues.homeTeam))