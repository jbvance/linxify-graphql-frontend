import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import EditLink from '../../components/EditLink';
import Error from '../../components/ErrorMessage';

export const USER_LINK_QUERY = gql`
  query USER_LINK_QUERY($id: ID!) {
    userLink(id: $id) {
      id
      url
      title
      favIcon
      note
      category {
        id
        name
      }
    }
  }
`;

const EditLinkPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, loading } = useQuery(USER_LINK_QUERY, {
    variables: {
      id
    }
  });
  if(data) console.log("DATA", data);

  if (loading) return <div>Loading...</div>;
  if(error) return <Error error={error} />

  return (
    <div>
      <EditLink link={data.userLink} />
      
     
    </div>
  );
};

export default EditLinkPage;
