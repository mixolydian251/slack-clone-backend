import { tryLogin } from "../authentication/auth";
import { formatErrors } from "../utils/formatErrors";

export default {
  Query: {
    getUser: (parent, {id}, {models}) => models.User.findOne({where: {id}}),
    allUsers: (parent, args, {models}) => models.User.findAll(),
  },
  Mutation: {
    login: (parent, {email, password}, {models, SECRET, SECRET2}) => {
      return tryLogin(email, password, models, SECRET, SECRET2)
    },
    register: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args);
        return {
          ok: true,
          user
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          errors: formatErrors(error, models)
        }
      }
    }
  }
};