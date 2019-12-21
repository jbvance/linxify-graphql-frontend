import React, { Component } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './PleaseSignIn';

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
  }
}
`;

const Signout = props => {
    const [signout, { loading, error, data }] = useMutation(SIGNOUT_MUTATION, {
        refetchQueries: [{query: CURRENT_USER_QUERY}]
    });
    return (
        <button onClick={async() => {
            await signout();
        }}>Signout</button>
    )
};
export default Signout;