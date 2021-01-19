import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

const Name = ({ name }) => {
  const [showNames, setShowNames] = useState(true);

  const handleClick = () => {
    setShowNames(false);
  }

  return (
    <div>
      {showNames &&
        <Link id='name' to={`/users/${name}`} onClick={handleClick}>{name}</Link>
      }
    </div>
  )
}

export default Name;