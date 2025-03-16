'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Channels', 'applicationId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'Applications', // Refers to Applications table
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Channels', 'applicationId');
  }
};
