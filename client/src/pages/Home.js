import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard.jsx';
import PostForm from '../components/PostForm.jsx';
import { FETCH_POSTS_QUERY } from '../utils/graphql.js';

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data: {getPosts: posts} = {} } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={1}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
          posts && posts.map(post => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;