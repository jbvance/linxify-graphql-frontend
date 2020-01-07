import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './PleaseSignIn';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

const Signup = props => {
  
  const [signupState, setSignupState] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [signup, { loading, error, data }] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY}],
    awaitRefetchQueries: true
  }); 
  
  const saveToState = e => {
    setSignupState({ ...signupState, [e.target.name]: e.target.value });
  };
 
  return ( 
        <Form
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            await signup({ variables: { email: signupState.email, password: signupState.password, name: signupState.name } });
            setSignupState({ name: '', email: '', password: '' });
          }}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Sign Up for An Account</h2>
            <Error error={error} />
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                placeholder="email"
                value={signupState.email}
                onChange={saveToState}
              />
            </label>
            <label htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                placeholder="name"
                value={signupState.name}
                onChange={saveToState}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                placeholder="password"
                value={signupState.password}
                onChange={saveToState}
              />
            </label>
            <button type="submit">Sign Up!</button>
          </fieldset>
        </Form>
      )
}    

export default Signup;
export { SIGNUP_MUTATION };