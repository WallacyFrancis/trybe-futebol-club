import { Request, Response, NextFunction } from 'express';

const expected = [
  'homeTeam',
  'awayTeam',
  'homeTeamGoals',
  'awayTeamGoals',
  'inProgress'
]

const messagesError = {
  igualClubs: { message: 'It is not possible to create a match with two equal teams' },
  fieldsNull: { message: 'There is no team with such id!' },
};

export default class MatchValidate {
  static verifyFields(req: Request, res: Response, next: NextFunction) {
    const compare = expected.filter((field) => !Object.keys(req.body).includes(field))
    const { fieldsNull } = messagesError;
    if (compare.length > 0) return res.status(401).json(fieldsNull);
    next()
  }

  static clubsError(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam} = req.body;
    const { igualClubs } = messagesError;
    if (homeTeam === awayTeam) return res.status(401).json(igualClubs)
    next();
  }
}