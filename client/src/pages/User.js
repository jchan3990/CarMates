import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Card, Icon, Image, List } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth.js';
import { FETCH_USER_QUERY, FETCH_USER_POSTS } from '../utils/graphql.js';

import LikeButton from '../components/LikeButton.jsx';

const User = (props) => {
  const username = props.match.params.username;

  const { data: {getUser: userData} = {} } = useQuery(FETCH_USER_QUERY, {
    variables: { username }
  });

  const { data: {getUserPosts: userPosts} = {} } = useQuery(FETCH_USER_POSTS, {
    variables: { username }
  });

  let userCard;
  if (!userData) {
    userCard = <p>Fetching user profile</p>;
  } else {
    const { id, createdAt, username, email, avatar, carYear, carMake, carModel, zipCode, followers, followerCount, following, followingCount } = userData;
    let joined = new Date(createdAt);
    joined = joined.getFullYear();
    let emailLink = `mailto:${email}`;

    console.log(followers)
    userCard = (
      <Card>
        <Image src={avatar} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{username}</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in {joined}</span>
          </Card.Meta>
          <Card.Description>
          <List>
            <List.Item>
              <List.Icon name='car' />
              <List.Content>{carYear} {carMake} {carModel}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='marker' />
              <List.Content>{zipCode}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='mail' />
              <List.Content>
                <a href={emailLink}>{email}</a>
              </List.Content>
            </List.Item>
          </List>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a className="followerCount">
            <Icon name='user' />
            {followerCount} Followers
          </a>
          <a className="followingCount">
            <Icon name='user' />
            {followingCount} Following
          </a>
        </Card.Content>
      </Card>
    )
  }

  let posts;
  if (!userPosts) {
    posts = <p>Loading {username}'s posts</p>
  } else {
    posts = (
      userPosts.map(post => (
        <Card fluid key={post.id}>
          <Card.Content>
            <Card.Header>{post.username}</Card.Header>
            <Card.Meta>{moment(post.createdAt).fromNow()}</Card.Meta>
            <Card.Description>{post.body}</Card.Description>
          </Card.Content>
          <hr/>
            <Card.Content extra>
              <Icon name='heart' id='user-prof-likes' />
              <p id='user-prof-like-count'>{post.likeCount}</p>
            </Card.Content>
        </Card>
      ))
    )
  }

  return (
    <div>
      <div className='user-profile'>
        {userCard}
      </div>
      <br/>
      <br/>
      <div className='user-posts'>
        <h2>{username}'s Top Posts</h2>
        {posts}
      </div>
    </div>
  )
}

export default User;