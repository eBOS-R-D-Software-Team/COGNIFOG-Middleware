'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('AnalysisResult', 'applicationId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Applications', // Make sure this matches your actual table name
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('AnalysisResult', 'applicationId');
  }
};
