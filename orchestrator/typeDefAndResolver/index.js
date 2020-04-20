const { gql } = require('apollo-server-express')
const { merge } = require('lodash')
const { schema, resolver } = require('./erbienbi')

const root = gql `
    type Query {
        root: String
    }

    type Mutation {
        root: String
    }
`

const rootResolver = {}

const typeDefs = [root, schema]
const resolvers = merge(rootResolver, resolver)

module.exports = {
    typeDefs,
    resolvers
}

