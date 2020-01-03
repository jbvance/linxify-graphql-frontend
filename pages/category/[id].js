import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import EditCategory from '../../components/EditCategory';
import Error from '../../components/ErrorMessage';

export const USER_CATEGORY_QUERY = gql`
  query USER_CATEGORY_QUERY($id: ID!) {
    userCategory(id: $id) {
      id
      name
    }
  }
`;

const EditCategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, loading } = useQuery(USER_CATEGORY_QUERY, {
    variables: {
      id
    }
  });  

  if (loading) return <div>Loading...</div>;
  if(error) return <Error error={error} />

  return (
    <div>
      <EditCategory category={data.userCategory} />           
    </div>
  );
};

export default EditCategoryPage;