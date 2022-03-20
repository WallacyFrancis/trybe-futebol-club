import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './Match';

class Club extends Model {
  public id: number;
  public club_name: string;
}

Club.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'clubs',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS: 
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeClube' }); 
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayClub' });

Match.hasMany(Club, { foreignKey: 'homeTeam', as: 'homeClube' });
Match.hasMany(Club, { foreignKey: 'awayTeam', as: 'awayClub' });

export default Club;
