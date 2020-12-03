import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth.js';
import { useForm } from '../utils/hooks.js';
import { LOGIN_USER } from '../utils/graphql.js';

const Login = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(login, {
    username: '',
    password: '',
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData }}) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  })

  function login() {
    loginUser();
    values.username = '';
    values.password = '';
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
        <h1>Login</h1>
        <Form.Input
          type="text"
          label="Username"
          placeholder="Username..."
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          type="password"
          label="Password"
          placeholder="Password..."
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
       </Form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map(value => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
  )
};

export default Login;