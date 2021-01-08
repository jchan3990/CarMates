import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';

import { AuthContext } from '../context/auth.js';
import FollowButton from './FollowButton.jsx';
import LikeButton from './LikeButton.jsx';
import DeleteButton from './DeleteButton.jsx';
import MyPopup from '../utils/MyPopup.js';
import { FETCH_USER_QUERY } from '../utils/graphql.js';

const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) => {
  const { user } = useContext(AuthContext);

  const { loading, data: {getUser: userData} = {} } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username,
    }
  });

  let defaultAvatar = 'https://artprojectsforkids.org/wp-content/uploads/2020/09/Easy-Car-1024x791.jpg'
  let userAvatar;

  if (userData) {
    userAvatar = userData.avatar !== '' ? userData.avatar : defaultAvatar;
  }

  let posts = loading ?
    <p>Loading posts...</p> :
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          avatar
          size='small'
          src={userAvatar}
        />
        <Card.Header style={{display: 'inline'}} as={Link} to={`/users/${username}`}>{username}</Card.Header>
          <FollowButton style={{display: 'inline'}} currUser={user} user={username} followers={userData.followers}/>
        <Card.Meta style={{display: 'block'}} as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description as={Link} to={`/posts/${id}`} style={{display: 'block'}}>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopup content='Comment on post'>
            <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
              <Button color='blue' basic>
                <Icon name='comments' />
              </Button>
              <Label basic color='blue' pointing='left'>
                {commentCount}
              </Label>
            </Button>
        </MyPopup>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>


  return posts;
};

export default PostCard;