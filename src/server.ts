import 'reflect-metadata';
import { buildSchema, useContainer } from 'type-graphql';
import { Container } from 'typedi';
import { ApolloServer } from 'apollo-server';
import { setupTypeORM } from './connectors/typeorm';
import { resolvers as TypeORMResolvers } from './connectors/typeorm/resolver';

export async function startServer() {
  await setupTypeORM();

  useContainer(Container);

  const schema = await buildSchema({
    resolvers: [...TypeORMResolvers],
  });

  const server = new ApolloServer({
    schema,
    playground: true,
  });

  const { url } = await server.listen(4000);
  console.log(`Server running is running, GraphQL Playground available at ${url}`);
}
