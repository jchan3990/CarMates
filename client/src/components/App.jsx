import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import Home from '../pages/Home.js';
import Login from '../pages/Login.js';
import Register from '../pages/Register.js';

const App = () => {

  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </Router>
  )
};

export default App;
