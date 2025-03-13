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
    Component.belongsTo(models.Application, { foreignKey: 'applicationId', as: 'application' }); // ✅ Ensure alias consistency
    Component.hasMany(models.Job, { foreignKey: 'componentId', as: 'jobs' });
    Component.hasMany(models.Channel, { foreignKey: 'incomingComponentId', as: 'incomingChannels' });
    Component.hasMany(models.Channel, { foreignKey: 'outgoingComponentId', as: 'outgoingChannels' });
  };
  
  return Component;
};
