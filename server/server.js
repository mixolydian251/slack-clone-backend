import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import models from '../models/models';

// grabs all types from ./schemas, then merges all resolver files into one big schema
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, '../schemas')));

// grabs all resolvers from ./resolvers, then merges all resolver files into one big resolver
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, '../resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();
app.use(cors('http://localhost:8080'));

const graphqlEndpoint = '/graphql';

app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      models,
      user: {
        id: 1
      }
    }
  }));
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

// pass { force: true } as sync arg to clear db

models.sequelize.sync({}).then(() => {
  app.listen(3000);
});