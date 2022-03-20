'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      home_team: {
        type: Sequelize.NUMBER,
      },
      home_team_goals: {
        type: Sequelize.NUMBER,
      },
      away_team: {
        type: Sequelize.NUMBER,
      },
      away_team_goals: {
        type: Sequelize.NUMBER,
      },
      in_progress: {
        type: Sequelize.NUMBER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matchs');
  }
};
