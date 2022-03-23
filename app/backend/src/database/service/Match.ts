import MatchModel from '../models/Match';
import ClubModel from '../models/Club';

export default class Match {
  static async getHomeTeam(id: number) {
    const homeTeam: any = await ClubModel.findByPk(id);
    // await Promise.all(homeTeam);
    // console.log(homeTeam)
    return {
      clubName: homeTeam?.club_name,
    }
  }

  static async findAll() {
    const matchs: any = await MatchModel.findAll();
    // await Promise.all(matchs);
    console.log(await this.getHomeTeam(16));
    return matchs.map((match: any) => ({
      ...match.dataValues,
      homeClub: this.getHomeTeam(match.homeTeam),
    }));
  }
};

// homeClub: await this.getHomeTeam(Number(match.dataValues.homeTeam))