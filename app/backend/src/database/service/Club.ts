import ClubModel from '../models/Club'

export default class Club {
  static async getAll() {
    const [clubs] = await ClubModel.findAll();
    return clubs;
  }
}