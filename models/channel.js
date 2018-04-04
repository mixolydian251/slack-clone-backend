export default (sequelize, DataTypes) => {
  const Channel = sequelize.define("channel", {
    name: {
      type: DataTypes.STRING,
      public: DataTypes.BOOLEAN
    },
  });

  Channel.associate = (models) => {
    Channel.belongsTo(models.Team, {
      foreignKey: {
        name: 'channelId',
        field: 'channel_id'
      },
    });
  };

  return Channel;
};