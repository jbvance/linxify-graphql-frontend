import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Links from './Links';
import ErrorMessage from './ErrorMessage';
import gql from 'graphql-tag';

export const USER_CATEGORY_LINKS_QUERY = gql`
  query USER_CATEGORY_LINKS_QUERY($categoryId: ID!) {
    userCategoryLinks(categoryId: $categoryId) {
      id
      url
      title
      favIcon
    }
  }
`;

const UserCategoryLinks = ({ categoryId }) => {  
  const { data, loading, error } = useQuery(USER_CATEGORY_LINKS_QUERY, {
      variables: {
          categoryId
      }
  });
  if (loading) return <div>Loading...</div>;  
  return (
    <React.Fragment>
      <ErrorMessage error={error} />
      <Links links={data.userCategoryLinks} categoryId={categoryId} />
    </React.Fragment>
  );
};

export default UserCategoryLinks;