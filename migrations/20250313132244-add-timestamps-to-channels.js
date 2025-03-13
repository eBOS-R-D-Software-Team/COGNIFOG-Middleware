'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // ✅ Add createdAt
    await queryInterface.addColumn('Channels', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'), // ✅ Default value prevents NULL errors
    });

    // ✅ Add updatedAt
    await queryInterface.addColumn('Channels', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Channels', 'createdAt');
    await queryInterface.removeColumn('Channels', 'updatedAt');
  }
};
