'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('category', {
      fields: ['name'],
      type: 'unique',
      name: 'uk_category_name'
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('category', 'uk_category_name');
  }
};
