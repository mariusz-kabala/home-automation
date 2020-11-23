import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import fetch from 'cross-fetch'

export const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:3000',
    fetch,
  }),
  cache: new InMemoryCache(),
  queryDeduplication: false,
})
