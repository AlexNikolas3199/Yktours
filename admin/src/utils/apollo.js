import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

const GraphURL = 'https://admin.yaktors.ru/graphql'
// const GraphURL = 'http://localhost:8000/graphql'

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token
        }
    }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(async ({ message, locations, path }) => {
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        })
    }
    if (networkError) console.error(`[Network error]: ${networkError}`)
})

const httpLink = createUploadLink({
    uri: GraphURL,
    credentials: 'same-origin'
})

const link = ApolloLink.from([errorLink, authLink, httpLink])

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

export default client
