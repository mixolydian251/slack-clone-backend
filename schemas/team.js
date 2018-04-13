const team = `
  type Team {
    name: String!
    owner: User!
    members: [User!]!
    channels: [Channel!]!
  }
  
  type Query {
    allTeams: [Team!]!
  }
  
  type CreateTeamResponse {
    ok: Boolean!
    team: Team
    errors: [Error!]
  }
 
  type Mutation {
   createTeam(name: String!): CreateTeamResponse!
  }
`;

export default team