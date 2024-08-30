module.exports = (sequelize, DataTypes) => {
  const Component = sequelize.define('Component', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    applicationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Component.associate = function(models) {
    Component.belongsTo(models.Application, { foreignKey: 'applicationId' });
    Component.hasMany(models.Job, { foreignKey: 'componentId' });
  };

  return Component;
};
