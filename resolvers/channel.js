export default {
  Query: {
    allChannels: (parent, args, { models }) => { models.Channel.findAll()},
    getChannels: (parent, { name }, { models }) => { models.Channel.findAll({where: { name }}) }
  },
  Mutation: {
    createChannel: async (parent, args, { models }) => {
      try {
        await models.Channel.create(args);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
}