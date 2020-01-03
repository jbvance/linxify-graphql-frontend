import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Links from './Links';
import ErrorMessage from './ErrorMessage';
import { USER_LINKS_QUERY } from './Links';

const AllLinks = () => {
  const { data, loading, error } = useQuery(USER_LINKS_QUERY);
  if (loading) return <div>Loading...</div>;
  return (
    <React.Fragment>
      <ErrorMessage error={error} />
      <Links links={data.userLinks} />
    </React.Fragment>
  );
};

export default AllLinks;
