import React, { useContext, useState, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Card, Form, Grid, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth.js';
import { CREATE_COMMENT_MUTATION, FETCH_POST_QUERY } from '../utils/graphql.js';
import LikeButton from '../components/LikeButton.jsx';
import DeleteButton from '../components/DeleteButton.jsx';
import MyPopup from '../utils/MyPopup.js';

const SinglePost = (props) => {
  const [comment, setComment] = useState('');
  const [commentInput, setCommentInput] = useState(false);

  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const commentInputRef = useRef(null);

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    }
  });

  const showCommentInput = () => {
    if (!commentInput) setCommentInput(true);
    else setCommentInput(false);
  }

  const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  })

  const deletePostCb = () => {
    props.history.push('/');
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post...</p>
  } else {
    const { id, body, createdAt, username, avatar, comments, likes, likeCount, commentCount } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              avatar
              src={avatar}
              size='small'
              float='right'
              />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr/>
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <MyPopup content="Comment on post">
                  <Button
                    as='div'
                    labelPosition='right'
                    onClick={showCommentInput}
                  >
                    <Button basic color='blue'>
                      <Icon name='comments'/>
                    </Button>
                    <Label basic color='blue' pointing='left'>
                      {commentCount}
                    </Label>
                  </Button>
                </MyPopup>
                  {user && user.username === username && (
                    <DeleteButton className='delCommBtn' postId={id} callback={deletePostCb} />
                  )}
              </Card.Content>
            </Card>
            {user && commentInput &&
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type='text'
                        placeholder='Comment...'
                        name="comment"
                        value={comment}
                        onChange={e => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button className='ui button teal' type='submit' disabled={comment.trim() === ''} onClick={submitComment}>Submit</button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            }
            {comments.map(comment => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
  return postMarkup;
}

export default SinglePost;