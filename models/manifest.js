module.exports = (sequelize, DataTypes) => {
  const Manifest = sequelize.define('Manifest', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Manifest.associate = function(models) {
    Manifest.belongsTo(models.Job, { foreignKey: 'jobId' });
  };

  return Manifest;
};
