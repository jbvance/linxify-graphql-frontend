import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Signin from './Signin';
import Signup from './Signup';
import Error from './ErrorMessage';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

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
      <Columns>        
        <Signin />
        <Signup />
      </Columns>
    );
  }
  return props.children;
};
export default PleaseSignIn;
