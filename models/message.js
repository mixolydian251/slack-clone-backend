export default (sequelize, DataTypes) => {
  const Message = sequelize.define("message", {
    text: {
      type: DataTypes.STRING,
    },
  });

  Message.associate = (models) => {
    // BelongTo is an 1:M relationship ( message can only belong to one channel )
    Message.belongsTo(models.Channel, {
      foreignKey: {
        name: 'channelId',
        field: 'channel_id'
      },
    });
    // BelongTo is an 1:M relationship ( message can only be from one user )
    Message.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
  };

  return Message;
};