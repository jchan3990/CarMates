import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Icon, Label } from 'semantic-ui-react';

import { FOLLOW_USER_MUTATION, FETCH_USER_QUERY } from '../utils/graphql.js'

const FollowButton = ({ currUser, user, followers }) => {
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (currUser && followers.find(follower => follower.username === currUser.username)) setFollowed(true);
    else setFollowed(false);
  }, [currUser, followers])

  const [clickFollow] = useMutation(FOLLOW_USER_MUTATION, {
    variables: { username: user }
  })

  function handleFollow() {
    clickFollow();
    let btnStatus = followed ? false : true;
    setFollowed(btnStatus);
  }

  const followBtn = currUser ? (
    currUser.username !== user ? (
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
    <span onClick={handleFollow}>
      {followBtn}
    </span>
  )
}

export default FollowButton;