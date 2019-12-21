import React, {useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './PleaseSignIn';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id,
      email,
      name
    }
}
`;


const Signin = props => {
  const [loginState, setLoginState] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [signin, { loading, error, data }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY}]
  });  

  // TODO, REMOVE THESE ONCE APOLLO IS ADDED
  //const loading = false;
  //const error = null;

  const saveToState = e => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };
  
  return (
    <Form
      method="POST"
      onSubmit={async e => {
        e.preventDefault();
        //const res = await signup();
        //console.log(res);
        await signin({ variables: { email: loginState.email, password: loginState.password } });        
        !error && setLoginState({ name: '', email: '', password: '' });
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign In</h2>
        <Error error={error} />
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={loginState.email}
            onChange={saveToState}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="password"
            value={loginState.password}
            onChange={saveToState}
          />
        </label>
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
};

export default Signin;
