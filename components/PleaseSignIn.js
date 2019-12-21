import { Query } from 'react-apollo';
import Signin from './Signin';
import Error from './ErrorMessage';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
    }
  }
`;

const PleaseSignIn = props => {
  const { loading, data, error} = useQuery(CURRENT_USER_QUERY);
  if (loading) return <p>Loading...</p>;
  <Error error={error} />
  if (!data.me) {
    return (
      <div>
        <p>Please Sign In before continuing!</p>
        <Signin />
      </div>
    );
  }
  return props.children;
};
export default PleaseSignIn;
