const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../server/model/Post.js');
const User = require('../../server/model/User.js');
const checkAuth = require('../../util/check-auth.js')

module.exports = {
  Query: {
    async getPosts(){
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUserPosts(_, { username }) {
      try {
        const posts = await Post.find({ 'username': username }).sort({ createdAt: -1 }).limit(10);
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      const userData = await User.findOne({"username": user.username});

      if (body.trim() === '') {
        throw new Error('Post body must not be empty');
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date(),
        avatar: userData.avatar
      });

      const post = await newPost.save();

      // context.pubsub.publish('NEW_POST', {
      //   newPost: post
      // });

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find(like => like.username === username)) {
          // Post already liked, unlike it
          post.likes = post.likes.filter(like => like.username !== username);
        } else {
          // Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date()
          })
        }

        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    }
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
    }
  }
};