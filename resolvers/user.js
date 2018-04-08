import bcrypt from 'bcrypt';
import _ from 'lodash';

// Grabs the error and path from user models if validation error
const formatErrors = (error, models) => {
  if (error instanceof models.sequelize.ValidationError) {
    return error.errors.map( error => _.pick(error, ['path', 'message']));
  }
  return [{path: 'name', message: 'Jordy: Something went wrong (but not a validation error)'}]
};

export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id }}),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    register: async (parent, args, {models}) => {
      try {
        if (args.password.length < 6){
          return {
            ok: false,
            errors: [{path: "password", message: "Password must be at least 6 characters."}]
          };
        }
        const hashedPassword = await bcrypt.hash(args.password, 10);
        const user = await models.User.create({...args, password: hashedPassword});
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