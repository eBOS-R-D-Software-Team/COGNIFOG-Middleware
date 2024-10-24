'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Channels', {
    id: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    incomingComponentId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Components',  // References the Components table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    outgoingComponentId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Components',  // References the Components table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  
  },{

    timestamps: false,  // Disable automatic createdAt and updatedAt columns

  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Channels');
  }
};
