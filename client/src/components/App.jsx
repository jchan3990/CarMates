import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import MenuBar from './MenuBar.jsx';
import Feed from '../pages/Feed.js';
import Login from '../pages/Login.js';
import Register from '../pages/Register.js';
import SinglePost from '../pages/SinglePost.js';

import { AuthProvider } from '../context/auth.js';
import AuthRoute from '../utils/AuthRoute.js';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Feed} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path='/posts/:postId' component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  )
};

export default App;
