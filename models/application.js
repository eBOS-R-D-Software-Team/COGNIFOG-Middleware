module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Application.associate = function(models) {
    Application.hasMany(models.Component, { foreignKey: 'applicationId', as: 'components' }); // ✅ Explicit alias added
    Application.hasMany(models.Channel, { foreignKey: 'applicationId', as: 'channels' });
    Application.hasOne(models.AnalysisResult, { foreignKey: 'applicationId', as: 'AnalysisResult' });

  };

  return Application;
};
