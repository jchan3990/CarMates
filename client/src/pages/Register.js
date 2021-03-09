import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth.js';
import { useForm } from '../utils/hooks.js';
import { REGISTER_USER } from '../utils/graphql.js';
import { gMapsKey } from '../../../config.js';

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, setValues, values } = useForm(registerUser, {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
    country: '',
    lat: 0,
    long: 0,
    avatar: '',
    carYear: '',
    carMake: '',
    carModel: ''
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
    (async (city, state, country) => {
      try {
        let address = '';
        state !== '' ? address = `${city.replace(' ', '+')},+${state},+${country.replace(' ','+')}` : address = `${city.replace(' ', '+')},+${country.replace(' ','+')}`;
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${gMapsKey}`);
        const data = await response.json();
        const lat = data.results[0].geometry.location.lat;
        const long = data.results[0].geometry.location.lng;
        setValues({...values, lat: lat, long: long})
        addUser();
      } catch (err) {
        console.log(err);
      }
    })(values.city, values.state, values.country);
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
        <h1>Register</h1>
        <p>User Info</p>
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
          label="City"
          placeholder="City..."
          name="city"
          value={values.city}
          error={errors.city ? true : false}
          onChange={onChange}
        />
        <Form.Input
          type="text"
          label="State"
          placeholder="Eg. CA (if applicable)..."
          name="state"
          value={values.state}
          error={errors.state ? true : false}
          onChange={onChange}
        />
        <Form.Input
          type="text"
          label="Country"
          placeholder="Country..."
          name="country"
          value={values.country}
          error={errors.country ? true : false}
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
        <br/>
        <p>Car Info</p>
        <Form.Input
          type="text"
          label="Year"
          placeholder="Year..."
          name="carYear"
          value={values.carYear}
          error={errors.carYear ? true : false}
          onChange={onChange}
        />
        <Form.Input
          type="text"
          label="Make"
          placeholder="Make..."
          name="carMake"
          value={values.carMake}
          error={errors.carMake ? true : false}
          onChange={onChange}
        />
        <Form.Input
          type="text"
          label="Model"
          placeholder="Model..."
          name="carModel"
          value={values.carModel}
          error={errors.carModel ? true : false}
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