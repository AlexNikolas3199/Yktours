import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'

export const url = 'https://admin.yaktors.ru/graphql'
// export const url = 'http://178.21.8.75:8000'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.error(`[Network error]: ${networkError}`)
})

const uploadLink = createUploadLink({
  uri: url,
  credentials: 'same-origin',
})

const link = ApolloLink.from([errorLink, uploadLink])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
