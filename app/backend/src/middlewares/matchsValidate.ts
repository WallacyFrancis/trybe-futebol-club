import { Request, Response, NextFunction } from 'express';

const expected = [
  'homeTeam',
  'awayTeam',
  'homeTeamGoals',
  'awayTeamGoals',
  'inProgress'
]

export default class MatchValidate {
  static verifyFields(req: Request, res: Response, next: NextFunction) {
    const compare = expected.filter((field) => !Object.keys(req.body).includes(field))
    if (compare.length > 0) return res.status(401).json({
      message: `Required ${compare} field(s)`
    });
    next()
  }
}