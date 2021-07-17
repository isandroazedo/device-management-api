'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'device',
      'categoryId',
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.removeColumn('device', 'categoryId')
  }
};
