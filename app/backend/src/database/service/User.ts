import UserModel from '../models/User';

export const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({ where: {email, password}});
  return user;
}

export const getAll = () => console.log('ok');