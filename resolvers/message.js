export default {
  Query: {
    getMessagesByChannel: (parent, { channelId }, { models }) => models.Message.findAll({where: { channel_id: channelId }})
  },
  Mutation: {
    createMessage: async (parent, args, { models, user }) => {
      try {
        await models.Message.create({
          ...args,
          userId: user.id
        });
        return true
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
}
