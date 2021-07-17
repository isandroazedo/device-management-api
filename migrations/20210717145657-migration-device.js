'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('device', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      category: {
        type: Sequelize.INTEGER,
        references: { model: 'category', key: 'id' }
      },
      color: {
        type: Sequelize.STRING(16),
        allowNull: false
      },
      partNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    },
    {
      indexes: [
            {
                unique: true,
                fields: ['category', 'partNumber']
            }
        ]
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('device');
  }
};
