module.exports = (sequelize, DataTypes) => {
  const Component = sequelize.define('Component', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure name is required
    },
    applicationId: {
      type: DataTypes.UUID,
      allowNull: false,  // Ensuring the applicationId is not null
    },
  });

  Component.associate = function(models) {
    // A component belongs to an application
    Component.belongsTo(models.Application, { foreignKey: 'applicationId', onDelete: 'CASCADE' });
    
    // A component has many jobs
    Component.hasMany(models.Job, { foreignKey: 'componentId', onDelete: 'CASCADE' });
  };

  return Component;
};
