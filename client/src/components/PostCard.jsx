import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth.js';
import LikeButton from './LikeButton.jsx';
import DeleteButton from './DeleteButton.jsx';
import MyPopup from '../utils/MyPopup.js';

const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) => {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          avatar
          size='small'
          src='https://i.pinimg.com/originals/3b/5e/63/3b5e63ea21bd2686ed344a4e94c644d1.jpg'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
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
  )
};

export default PostCard;