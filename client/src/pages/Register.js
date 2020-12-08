import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth.js';
import { useForm } from '../utils/hooks.js';
import { REGISTER_USER } from '../utils/graphql.js';

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(registerUser, {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    avatar: ''
  })

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData }}) {
      context.login(userData);
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  })

  function registerUser() {
    addUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
        <h1>Register</h1>
        <Form.Input
          type="text"
          label="Email"
          placeholder="Email..."
          name="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
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
        <Form.Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Form.Input
          type="text"
          label="Avatar"
          placeholder="Avatar..."
          name="avatar"
          value={values.avatar}
          error={errors.avatar ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
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

export default Register;