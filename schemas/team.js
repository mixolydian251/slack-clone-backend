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
 
  type Mutation {
   createTeam(name: String!): Boolean!
  }
`;

export default team