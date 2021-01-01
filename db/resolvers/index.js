const postsResolvers = require('./posts.js');
const usersResolvers = require('./users.js');
const commentsResolvers = require('./comments.js');

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length
  },
  User: {
    followerCount: (parent) => parent.followers.length,
    followingCount: (parent) => parent.following.length
  },
  Query: {
    ...postsResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription
  }
}