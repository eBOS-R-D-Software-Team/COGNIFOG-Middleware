'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('AnalysisResult', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      consistency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      liveness: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fileExtension: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file: {
        type: Sequelize.BLOB,  // Store file as BLOB
        allowNull: false,
      },
      applicationId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
   
    }, {
      tableName: 'AnalysisResult',  // Explicitly define the table name here
      timestamps: false,  // Disable automatic createdAt and updatedAt columns

    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('AnalysisResult');

  }
};
