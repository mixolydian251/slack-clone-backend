import { formatErrors } from "../utils/formatErrors";
import { requiresAuth } from "../authentication/permissions";

export default {
  Query: {
    allTeams: (parent, args, { models }) => models.Team.findAll(),
  },
  Mutation: {
    createTeam: requiresAuth.createResolver( async (parent, args, { models, user }) => {
      try {
        const team = await models.Team.create({
          ...args,
          owner: user.id
        });
        return {
          ok: true,
          team
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          errors: formatErrors(error, models)
        }
      }
    })
  }
}