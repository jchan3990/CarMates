import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth.js';
import { FETCH_USER_QUERY } from '../utils/graphql.js';

const User = (props) => {

  return (
    <div>
      <h1>Test</h1>
    </div>
  )
}

export default User;