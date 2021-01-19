import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';

const SearchBar = ({ handleSearchTerm, currPath, updateLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  let location = useLocation();
  let locationPath = location.pathname

  const updateParentLocation = () => {
    updateLocation(locationPath);
  }

  if (currPath !== locationPath) {
    Array.from(document.querySelectorAll('#search-bar')).forEach(input => input.value = '');
    updateParentLocation();
  }

  return (
    <Input
      id='search-bar'
      name='search'
      size='small'
      icon='search'
      placeholder='Search...'
      onChange={e => handleSearchTerm(e.target.value)}
    />
  )
}

export default SearchBar;