module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    incomingComponentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    outgoingComponentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {

    timestamps: false,  // Disable automatic createdAt and updatedAt columns

  });

  Channel.associate = function(models) {
    Channel.belongsTo(models.Component, { as: 'IncomingComponent', foreignKey: 'incomingComponentId' });
    Channel.belongsTo(models.Component, { as: 'OutgoingComponent', foreignKey: 'outgoingComponentId' });
  };

  return Channel;
};
