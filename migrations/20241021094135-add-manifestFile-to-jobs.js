'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Jobs', 'manifestFile', {
      type: Sequelize.BLOB('long'), // Blob to store the file content
      allowNull: true, // You can change this if needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Jobs', 'manifestFile');
  }
};
