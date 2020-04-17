const express = require('express')
const app = express()
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./typeDefAndResolver')
const PORT = process.env.PORT || 3005
const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })
app.listen(PORT, () => console.log(`Orchestrator running at port`, PORT))