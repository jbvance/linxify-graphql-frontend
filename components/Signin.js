import React, {useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router'
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './PleaseSignIn';
import { CREATE_LINK_MUTATION } from './CreateLink';
import { USER_LINKS_QUERY } from './Links';

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
  const router = useRouter();
  const [loginState, setLoginState] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [signin, { loading, error, data }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY} ],
    awaitRefetchQueries: true
  }); 
  
  const [saveLink, saveLinkResult] = useMutation(CREATE_LINK_MUTATION, {
    refetchQueries: [{ query: USER_LINKS_QUERY }],
    awaitRefetchQueries: true
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
        let linkToSave;
        e.preventDefault();
        //const res = await signup();
        //console.log(res);
        await signin({ variables: { email: loginState.email, password: loginState.password } });
        // Save linkToSave if one is set in localStorage
        if (!error) {
          linkToSave = localStorage.getItem('linkToSave');
          if (linkToSave) {
            linkToSave = JSON.parse(linkToSave);
            await saveLink({
              variables: {
                url: linkToSave.url,
                category: linkToSave.category ? linkToSave.category : ''
              }
            });
             //localStorage.removeItem('linkToSave');
            if(!saveLinkResult.error) {
              router.push('/');
            }
           

          }
        }        
        !error && setLoginState({ name: '', email: '', password: '' });
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign In</h2>
        <Error error={error} />
        <Error error={saveLinkResult.error} />
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
