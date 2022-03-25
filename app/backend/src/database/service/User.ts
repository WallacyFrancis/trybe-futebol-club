import UserModel from '../models/User';

export default class User {
  private _email: string;
  private _password: string;

  constructor(email: string, password: string) {
    this._email = email
    this._password = password
  }

  static async login(email: string) {
    const user = await UserModel.findOne({ where: { email }});
    return {
      id: user?.id,
      username: user?.username,
      role: user?.role,
      email: user?.email,
    };
  }
};
