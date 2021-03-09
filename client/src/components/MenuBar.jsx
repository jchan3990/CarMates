import React, { useContext, useEffect, useState, useRef } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks'

import { AuthContext } from '../context/auth.js';
import { FETCH_ALL_USERS_QUERY } from '../utils/graphql.js';
import SearchBar from './SearchBar.jsx';
import Names from './Names.jsx';

const MenuBar = () => {
  const [activeItem, setActiveItem] = useState(path);
  const [searchTerm, setSearchTerm] = useState('');

  let Location = useLocation();
  const [locationPath, setLocationPath] = useState(location.pathname);

  const { user, logout } = useContext(AuthContext);
  const node = useRef();
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1)

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);
    return () => {
      document.removeEventListener("mousedown", handleClickOut)
    }
  }, []);

  const handleClickOut = e => {
    if (node.current.contains(e.target)) {
      return;
    } else {
      setSearchTerm('');
    }
  }

  const updateLocation = (loc) => {
    setLocationPath(loc);
    setSearchTerm('');
  }

  const { data: { getAllUsers: allUsers }= {} } = useQuery(FETCH_ALL_USERS_QUERY)

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const handleSearchTerm = (term) => {
    setSearchTerm(term);
  }

  const dynamicSearch = () => {
    if (allUsers) {
      return allUsers.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  }

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="red">
      <Menu.Item
        name={user.username}
        active={activeItem === user.username}
        onClick={handleItemClick}
        as={Link}
        to={`/users/${user.username}`}
      />
      <Menu.Item
        name='feed'
        active={activeItem === 'feed'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item
        name='map'
        active={activeItem === 'map'}
        onClick={handleItemClick}
        as={Link}
        to="/map"
      />
      <Menu.Menu position='right'>
      <div id='dynamic-search' ref={node}>
        <SearchBar handleSearchTerm={handleSearchTerm} currPath={locationPath} updateLocation={updateLocation} />
        {searchTerm &&
          <Names names={dynamicSearch()} />
        }
      </div>
      <Menu.Item
          name='logout'
          as={Link}
          to='/'
          onClick={logout}
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="red">
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item
        name='map'
        active={activeItem === 'map'}
        onClick={handleItemClick}
        as={Link}
        to="/map"
      />
      <Menu.Menu position='right'>
      <div id='dynamic-search' ref={node}>
        <SearchBar handleSearchTerm={handleSearchTerm} currPath={locationPath} updateLocation={updateLocation} />
        {searchTerm &&
          <Names names={dynamicSearch()} />
        }
      </div>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  )

  return menuBar;
};

export default MenuBar;