import React from 'react';
import { Input } from 'semantic-ui-react';

const SearchBar = ({ handleSearchTerm }) => {

  return (
    <Input
      name='search'
      size='small'
      icon='search'
      placeholder='Search...'
      onChange={(e) => handleSearchTerm(e.target.value)}
    />
  )
}

export default SearchBar;