import ClubModel from '../models/Club'

export default class Club {
  static async findAll() {
    const clubs = await ClubModel.findAll()
    return clubs;
  }

  static async findByPk(id: number) {
    const club = await ClubModel.findByPk(id);
    return club;
  }
}