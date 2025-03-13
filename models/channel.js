module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    applicationId: {  
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Applications',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    incomingComponentId: {  
      type: DataTypes.UUID,
      allowNull: true,
    },
    outgoingComponentId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  }, {
    timestamps: true,  // ✅ Enables createdAt & updatedAt columns
  });

  Channel.associate = function(models) {
    Channel.belongsTo(models.Application, { foreignKey: 'applicationId', as: 'application' });
  };

  return Channel;
};
