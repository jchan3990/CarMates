import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { CREATE_COMMENT_MUTATION, FETCH_POSTS_QUERY, DELETE_POST_MUTATION, DELETE_COMMENT_MUTATION } from '../utils/graphql.js';
import { AuthContext } from '../context/auth.js';
import MyPopup from '../utils/MyPopup.js';

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const { user } = useContext(AuthContext);
  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery( {
          query: FETCH_POSTS_QUERY
        });
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: data.getPosts.filter(p => p.id !== postId),
          },
        });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId
    }
  });

  return (
    <>
    <MyPopup content={commentId ? 'Delete comment' : 'Delete post'}>
      <Button
        as='div'
        color='red'
        floated='right'
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{margin: 0}}/>
      </Button>
    </MyPopup>
    <Confirm
      open={confirmOpen}
      onCancel={() => setConfirmOpen(false)}
      onConfirm={deletePostOrComment}
    />
    </>
  )
}

export default DeleteButton;