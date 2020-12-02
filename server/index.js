
const mongoose = require('mongoose');
const { ApolloServer } = require ('apollo-server');
const { GraphQLScalarType } = require('graphql')

const { MONGODB } = require('../config.js');
const typeDefs = require('../db/typeDefs.js')
const resolvers = require('../db/resolvers')
const Post = require('./model/Post.js');
const User = require('./model/User.js')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
})

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 3000});
  })
  .then(res => {
    console.log(`Server running at ${res.url}`)
  })