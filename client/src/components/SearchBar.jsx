import React, { useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';

const SearchBar = ({ handleSearchTerm, currPath, updateLocation }) => {
  let location = useLocation();
  let locationPath = location.pathname

  useEffect(() => {
    if (currPath !== locationPath) {
      Array.from(document.querySelectorAll('#search-bar')).forEach(input => input.value = '');
      updateParentLocation();
    }
  }, [locationPath])

  const updateParentLocation = () => {
    updateLocation(locationPath);
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