import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon, Label } from 'semantic-ui-react';

import { FOLLOW_USER_MUTATION } from '../utils/graphql.js'

const FollowButton = ({ currUser, user, followers, followerCount }) => {
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (currUser && followers.find(follower => follower.username === currUser)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, []);

  const [clickFollow] = useMutation(FOLLOW_USER_MUTATION, {
    variables: { username: user }
  })

  const followBtn = currUser ? (
    currUser !== user ? (
      followed ? (
        <Button
          primary
          size="mini"
          id="followUnfollowBtn"
        >
          Unfollow
        </Button>
      ) : (
        <Button
          primary
          size="mini"
          id="followUnfollowBtn"
        >
          Follow
        </Button>
      )
    ) : (null)
  ) : (
    <Button
      as={Link} to='/login'
      primary
      size="mini"
      id="followUnfollowBtn"
    >
      Follow
    </Button>
  )

  return (
    <span onClick={clickFollow}>
      {followBtn}
    </span>
  )
}

export default FollowButton;