import React, { useContext, useState }from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks'

import { useForm } from '../utils/hooks.js';
import { CREATE_POST, FETCH_POSTS_QUERY } from '../utils/graphql.js';

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(createPostCb, {
    body: ''
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = '';
    },
  });

  function createPostCb() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a Post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="Hi World!"
          name="body"
          onChange={onChange}
          value={values.body}
        />
        <Button type="submit">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
}

export default PostForm;