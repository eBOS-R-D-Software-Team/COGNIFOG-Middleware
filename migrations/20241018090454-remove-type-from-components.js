'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Components', 'type');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Components', 'type', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};

