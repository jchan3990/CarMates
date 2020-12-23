import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Card, Icon, Image, List } from 'semantic-ui-react';

import { AuthContext } from '../context/auth.js';
import { FETCH_USER_QUERY } from '../utils/graphql.js';

const User = (props) => {
  const username = props.match.params.username;

  const { data: {getUser: userData} = {} } = useQuery(FETCH_USER_QUERY, {
    variables: { username }
  });

  let userCard;
  if (!userData) {
    userCard = <p>Fetching user profile</p>;
  } else {
    const { id, createdAt, username, email, avatar, carYear, carMake, carModel, zipCode } = userData;
    let joined = new Date(createdAt);
    joined = joined.getFullYear();
    let emailLink = `mailto:${email}`;

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
          <a>
            <Icon name='user' />
            22 Friends
          </a>
        </Card.Content>
      </Card>
    )
  }

  return userCard;
}

export default User;