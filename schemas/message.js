const message = `
  type Message {
    id: Int!
    text: String!
    user: User!
    channel: Channel!
  }
  
  type Query {
    getMessagesByChannel(channelId: Int!): [Message!]!
  }
  
  type Mutation {
    createMessage(channelId: Int!, text: String!): Boolean!
  }
`;

export default message