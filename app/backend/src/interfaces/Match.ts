export interface IMatch {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
};

export interface OutMatch extends IMatch {
  id: number,
}