
const { ApolloServer, PubSub } = require ('apollo-server');
const Parser = require('body-parser');
const express = require('express');
const { GraphQLScalarType } = require('graphql')
const mongoose = require('mongoose');
const path = require('path');

const { MONGODB } = require('../config.js');
const typeDefs = require('../db/typeDefs.js')
const resolvers = require('../db/resolvers')
const Post = require('./model/Post.js');
const User = require('./model/User.js')

// React App Server Config
const app = express();
const port = 3333;
app.use(express.static('./client/dist'));
app.use(Parser.urlencoded({ extended: true}));
app.use(Parser.json());

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// MongoDB Server Config
const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
})

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 3000});
  })
  .then(res => {
    console.log(`Server running at ${res.url}`)
  })