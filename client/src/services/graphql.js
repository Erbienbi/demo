import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql',
  clientState: {
    resolvers: {
      Mutation: {
        // addLocalUser: (root, variables, client) => {
        //   console.log('Entering Apollo Client (mutation):', client, variables, client)
        // },
        // addToFavorites: (root, variables, client) => {
        //   console.log('Entering local:', variables)
        //   let {favorites} = client.cache.readQuery({query: GET_ALL_FAVORITES})
        //   const newFavorite = {...variables, __typename: 'favorites' }
        //   let newFavorites = favorites.concat(newFavorite)
        //   client.cache.writeData({data:
        //     {favorites: newFavorites}
        //   })
        // }
      },
    },
    defaults: {
    //   localUsers: [
    //     { name: "John Local Default", age: 30, __typename: "users" }
    //   ],
    //   favorites: [
    //   ],
    },
  },
});
