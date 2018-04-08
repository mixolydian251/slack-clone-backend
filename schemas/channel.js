const channel = `
  type Channel {
    id: Int!
    name: String!
    public: Boolean!
    messages: [Message!]!
    users: [User!]!
  }
  
  type Query {
    allChannels: [Channel!]!
    getChannels(name: String!): [Channel!]
  }
  
  type Mutation {
    createChannel(teamId: Int!, name: String!, public: Boolean=false): Boolean!
  }
`;

export default channel