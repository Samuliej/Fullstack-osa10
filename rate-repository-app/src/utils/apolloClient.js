import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const APOLLO_URI = Constants.expoConfig.extra.apollo_uri;

const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  uri: APOLLO_URI,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;