import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Links, { USER_LINKS_QUERY } from './Links';
import ErrorMessage from './ErrorMessage';
import Pagination from './Pagination';
import { perPage } from '../config';

const AllLinks = (props) => {    
  const { data, loading, error } = useQuery(USER_LINKS_QUERY, {
    variables: {
      skip: props.page * perPage - perPage,      
    }
  });
  if (loading) return <div>Loading...</div>;
  //if (data) console.log('DATA', data);
  return (
    <React.Fragment>
      <ErrorMessage error={error} />
      <Pagination page={props.page} />
      <Links links={data.userLinks} page={props.page} perPage={perPage} />
      <Pagination page={props.page} />
    </React.Fragment>
  );
};

export default AllLinks;
