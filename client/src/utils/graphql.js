import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
{
  getPosts {
    id
    body
    createdAt
    username
    avatar
    likeCount
    likes {
      username
    }
    commentCount
    comments {
      id
      username
      createdAt
      body
    }
  }
}
`;

export const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      avatar
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const FETCH_USER_POSTS = gql`
  query($username: String!) {
    getUserPosts(username: $username) {
      id
      username
      body
      createdAt
      commentCount
      likeCount
    }
  }
`

export const FETCH_ALL_USERS_QUERY = gql`
{
  getAllUsers {
    id
    username
    email
    avatar
    createdAt
    city
    state
    country
    lat
    long
    carYear
    carMake
    carModel
    followers {
      username
    }
    followerCount
    following {
      username
    }
    followingCount
  }
}
`

export const FETCH_USER_QUERY = gql`
query($username: String!) {
  getUser(username: $username) {
    id
    username
    email
    avatar
    createdAt
    city
    state
    country
    lat
    long
    carYear
    carMake
    carModel
    followers {
      username
    }
    followerCount
    following {
      username
    }
    followingCount
  }
}
`;

export const LOGIN_USER = gql`
  mutation login (
    $username: String!
    $password: String!
  ) {
    login (
      username: $username
      password: $password
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register (
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
    $city: String
    $state: String
    $country: String
    $lat: Float
    $long: Float
    $avatar: String
    $carYear: String
    $carMake: String
    $carModel: String
  ) {
    register (
      registerInput: {
        email: $email
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        city: $city
        state: $state
        country: $country
        lat: $lat
        long: $long
        avatar: $avatar
        carYear: $carYear
        carMake: $carMake
        carModel: $carModel
      }
    ) {
      id
      email
      username
      createdAt
      token
      city
      state
      country
      avatar
      carYear
      carMake
      carModel
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      avatar
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
  `;

  export const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      id
      username
      followers {
        username
      }
      followerCount
      following {
        username
      }
      followingCount
    }
  }
  `

  export const GET_FOLLOWERS_QUERY = gql`
  query getUserFollowers($username: String!) {
    getUserFollowers(username: $username) {
      id
      username
    }
  }
  `