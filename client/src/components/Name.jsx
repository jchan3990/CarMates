import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

const Name = ({ name }) => {

  return (
    // <a id='name' href={`/users/${name}`}>{name}</a>
    <Link id='name' to={`/users/${name}`}>{name}</Link>
  )
}

export default Name;