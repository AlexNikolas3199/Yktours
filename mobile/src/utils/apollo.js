import {ApolloClient, ApolloLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import {createUploadLink} from 'apollo-upload-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const url = 'https://admin.yaktors.ru/graphql';
// export const url = 'http://192.168.0.4:8000/';

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.map(({message, locations, path}) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const uploadLink = createUploadLink({
  uri: url,
  credentials: 'same-origin',
});

const link = ApolloLink.from([authLink, errorLink, uploadLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
