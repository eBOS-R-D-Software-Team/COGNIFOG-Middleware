// models/job.js
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    componentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    manifestName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manifestFile: {
      type: DataTypes.BLOB('long'), // To store large files
      allowNull: false,
    },
    executionTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cpu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    memory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Job.associate = function(models) {
    Job.belongsTo(models.Component, { foreignKey: 'componentId', onDelete: 'CASCADE' });
  };

  return Job;
};
