'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Device',
      'categoryId',
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.removeColumn('Device', 'categoryId')
  }
};
