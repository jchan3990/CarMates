const { AuthenticationError, UserInputError } = require('apollo-server');

const checkAuth = require('../../util/check-auth.js')
const Post = require('../../server/model/Post.js');

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty'
          }
        })
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.push({
          body,
          username,
          createdAt: new Date()
        })
        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        const commentIdx = post.comments.findIndex(c => c.id === commentId);

        if (post.comments[commentIdx].username === username) {
          post.comments.splice(commentIdx, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationErrpr('Action not allowed');
        }
      } else {
        throw new UserInputError('Post not found');
      }
    }
  }
}