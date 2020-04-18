import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const GQL_ENDPOINT = 'turnip-turnover.herokuapp.com/v1/graphql';

// set up http link for GraphQL queries and mutations
const httpLink = new HttpLink({
  uri: `https://${GQL_ENDPOINT}`,
});

// set up websocket link for GraphQL subscriptions
const wsLink = new WebSocketLink({
  uri: `wss://${GQL_ENDPOINT}`,
  options: {
    reconnect: true,
  },
});

// combine the http and websocket links so Apollo can
// use the correct connection for the query type
// code taken from Apollo docs: https://www.apollographql.com/docs/react/data/subscriptions/
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: ApolloLink.from([
    // GraphQL and general networking error logging
    onError(({ gqlErrors, networkError }) => {
      if (gqlErrors) {
        gqlErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }

      if (networkError) {
        console.log(`[Network error]: ${JSON.stringify(networkError)}`);
      }
    }),
    link,
  ]),
  // set up Apollo's in-memory cache
  cache: new InMemoryCache(),
});

export default client;
