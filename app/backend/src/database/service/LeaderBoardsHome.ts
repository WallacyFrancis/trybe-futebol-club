import MatchModels from '../models/Match';
import ClubModel from '../models/Club';

// total de pontos = win + 3 , loss 0 , empate + 1
// aproveitamento = Pontos/TotalJogos * 3)*100 -> com duas casas decimais

/* 
  "name": "Palmeiras", 
  "totalPoints": 13,
  "totalGames": 5,
  "totalVictories": 4,
  "totalDraws": 1,
  "totalLosses": 0,
  "goalsFavor": 17,
  "goalsOwn": 5,
  "goalsBalance": 12,
  "efficiency": 86.67
*/

export default class LeaderBoardHome {
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
      if (match.homeTeam === id) {
        if (match.homeTeamGoals > match.awayTeamGoals) {
            points += 3;
          };
        if (match.homeTeamGoals === match.awayTeamGoals) {
          points += 1;
        }
      }
    });
    return points;
  }

  static getGames(matchs: any, id: number) {
    let games: number = 0;
    matchs.map((match: any) => {
      if (match.homeTeam === id) {
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
      if (match.homeTeam === id) {
        if (match.homeTeamGoals > match.awayTeamGoals) {
          victory += 1;
        }
      }
    });
    return victory;
  }

  static getLosses(matchs: any, id: number) {
    let loss: number = 0;
    matchs.map((match: any) => {
      if (match.homeTeam === id) {
        if (match.homeTeamGoals < match.awayTeamGoals) {
          loss += 1;
        }
      }
    });
    return loss;
  }

  static getDraws(matchs: any, id: number) {
    let draws: number = 0;
    matchs.map((match: any) => {
      if (match.homeTeam === id) {
        if (match.homeTeamGoals === match.awayTeamGoals) {
          draws += 1;
        }
      }
    });
    return draws;
  }

  static getGoalsFavor(matchs: any, id: number) {
    let homeGoals: number = 0;
    matchs.map((match: any) => {
      if (match.homeTeam === id) {
        homeGoals += match.homeTeamGoals;
      }
    });
    return homeGoals;
  }

  static getGoalsOwn(matchs: any, id: number) {
    let ownGoals: number = 0;
    matchs.map((match: any) => {
      if (match.homeTeam === id) {
        ownGoals += match.awayTeamGoals;
      }
    });
    return ownGoals;
  }

  static getEfficiency(points: number, games: number) {
    const efficiency = (points / (games * 3)) * 100;
    return efficiency.toFixed(2);
  }
  
  static sortMatchs(arr: any) {
    arr.sort((matchA: any, matchB: any) => {
      let orden = matchB.totalVictories - matchA.totalVictories;
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

  static async getTeamHome() {
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
