module.exports = (sequelize, DataTypes) => {
    const AnalysisResult = sequelize.define('AnalysisResult', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      consistency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      liveness: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileExtension: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file: {
        type: DataTypes.BLOB('long'),  // Store file as BLOB
        allowNull: false,
      },
      applicationId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    });
  
    AnalysisResult.associate = function(models) {
      AnalysisResult.belongsTo(models.Application, { foreignKey: 'applicationId' });
    };
  
    return AnalysisResult;
  };
  