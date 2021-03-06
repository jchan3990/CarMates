const { gql } = require('apollo-server');

module.exports = gql`
  scalar Date
  type Post {
    id: ID!,
    body: String!
    createdAt: Date!
    username: String!
    avatar: String
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: Date!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: Date!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: Date!
    city: String
    state: String
    country: String
    lat: Float
    long: Float
    avatar: String
    carYear: String
    carMake: String
    carModel: String
    followers: [Follower]!
    followerCount: Int!
    following: [Following]!
    followingCount: Int!
  }
  type Follower {
    id: ID!
    username: String!
    createdAt: Date!
  }
  type Following {
    id: ID!
    username: String!
    createdAt: Date!
  }
  input RegisterInput {
    email: String!
    username: String!
    password: String!
    confirmPassword: String!
    city: String
    state: String
    country: String
    lat: Float
    long: Float
    avatar: String
    carYear: String
    carMake: String
    carModel: String
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUserPosts(username: String!): [Post]
    getUser(username: String!): User
    getAllUsers: [User]
    getUserFollowers(username: String!): [Follower]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    followUser(username: String!): User!
  }
  type Subscription {
    newPost: Post!
  }
`;