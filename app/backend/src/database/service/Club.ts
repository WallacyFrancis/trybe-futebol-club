import ClubModel from '../models/Club'

const parseCamelCase = (arr: object[]) => {
  return arr.map((item: any) => ({
    id: item.id,
    clubName: item.club_name
  }));
}

export default class Club {
  static async findAll() {
    const clubs = await ClubModel.findAll()
    return parseCamelCase(clubs);
  }

  static async findByPk(id: number) {
    const club = await ClubModel.findByPk(id);
    return club;
  }
}