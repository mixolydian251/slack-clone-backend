const team = `
  type Team {
    owner: User!
    members: [User!]!
    channels: [Channel!]!
  }
`;

export default team