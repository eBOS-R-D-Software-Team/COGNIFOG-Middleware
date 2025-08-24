'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Add applicationId only if it isn’t already in the table.
   * This works on every dialect Sequelize supports, not just Postgres.
   */
  up: async (queryInterface, Sequelize) => {
    // Ask the database for the current column list
    const columns = await queryInterface.describeTable('AnalysisResult');

    if (!columns.applicationId) {
      // Column is missing → create it
      await queryInterface.addColumn('AnalysisResult', 'applicationId', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Applications',   // keep this exactly as your table name
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
    // If the column already exists, do nothing and finish silently
  },

  /**
   * Down migration remains the same: always remove the column.
   */
  down: async (queryInterface) => {
    await queryInterface.removeColumn('AnalysisResult', 'applicationId');
  },
};
