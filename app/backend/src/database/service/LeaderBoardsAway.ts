import MatchModels from '../models/Match';
import ClubModel from '../models/Club';

export default class LeaderBoardAway {
  static async clubHome() {
    const matchs = await MatchModels.findAll({
      where: { inProgress: false },
    });
    Promise.all(matchs);
    return matchs
  };

  static async getclub() {
    const clubs = await ClubModel.findAll()
    Promise.all(clubs);
    return clubs
  }

  static getPoints(matchs: any, id: number) {
    let points: number = 0;
    matchs.map((match: any) => {
      if (match.awayTeam === id) {
        if (match.awayTeamGoals > match.homeTeamGoals) {
            points += 3;
          };
        if (match.awayTeamGoals === match.homeTeamGoals) {
          points += 1;
        }
      }
    });
    return points;
  }

  static getGames(matchs: any, id: number) {
    let games: number = 0;
    matchs.map((match: any) => {
      if (match.awayTeam === id) {
        games += 1;
      }
    })
    return games;
  }

  static getClubName(club: any) {
    return club.clubName;
  }

  static getVictories(matchs: any, id: number) {
    let victory: number = 0;
    matchs.map((match: any) => {
      if (match.awayTeam === id) {
        if (match.awayTeamGoals > match.homeTeamGoals) {
          victory += 1;
        }
      }
    });
    return victory;
  }

  static getLosses(matchs: any, id: number) {
    let loss: number = 0;
    matchs.map((match: any) => {
      if (match.awayTeam === id) {
        if (match.awayTeamGoals < match.homeTeamGoals) {
          loss += 1;
        }
      }
    });
    return loss;
  }

  static getDraws(matchs: any, id: number) {
    let draws: number = 0;
    matchs.map((match: any) => {
      if (match.awayTeam === id) {
        if (match.awayTeamGoals === match.homeTeamGoals) {
          draws += 1;
        }
      }
    });
    return draws;
  }

  static getGoalsFavor(matchs: any, id: number) {
    let awayGoals: number = 0;
    matchs.map((match: any) => {
      if (match.awayTeam === id) {
        awayGoals += match.awayTeamGoals;
      }
    });
    return awayGoals;
  }

  static getGoalsOwn(matchs: any, id: number) {
    let ownGoals: number = 0;
    matchs.map((match: any) => {
      if (match.awayTeam === id) {
        ownGoals += match.homeTeamGoals;
      }
    });
    return ownGoals;
  }

  static getEfficiency(points: number, games: number) {
    const efficiency = (points / (games * 3)) * 100;
    const result = efficiency % 1 === 0 ? efficiency : efficiency.toFixed(2)
    return result;
  };
  
  static sortMatchs(arr: any) {
    arr.sort((matchA: any, matchB: any) => {
      let orden = matchB.totalPoints - matchA.totalPoints;
      if (orden === 0) {
        orden = matchB.goalsBalance - matchA.goalsBalance;
        if (orden === 0) {
          orden = matchB.goalsFavor - matchA.goalsFavor;
          if (orden === 0) {
            orden = matchB.goalsOwn - matchA.goalsOwn;
          }
        }
      } 
      return orden;
    });
  }

  static async getTeamAway() {
    const matchArr = await this.clubHome();
    const clubArr  = await this.getclub();
    const result = clubArr.map((club: any) => ({
      name: this.getClubName(club),
      totalPoints: this.getPoints(matchArr, club.id),
      totalGames: this.getGames(matchArr, club.id),
      totalVictories: this.getVictories(matchArr, club.id),
      totalDraws: this.getDraws(matchArr, club.id),
      totalLosses: this.getLosses(matchArr, club.id),
      goalsFavor: this.getGoalsFavor(matchArr, club.id),
      goalsOwn: this.getGoalsOwn(matchArr, club.id),
      goalsBalance: this.getGoalsFavor(matchArr, club.id) - this.getGoalsOwn(matchArr, club.id),
      efficiency: this.getEfficiency(this.getPoints(matchArr, club.id), this.getGames(matchArr, club.id)),
    }));
    Promise.all(result);
    this.sortMatchs(result);
    return result;
  };

};
