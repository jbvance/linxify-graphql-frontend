import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';
import Error from './ErrorMessage';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    linksConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;
  const count = data.linksConnection.aggregate.count;
  const pages = Math.ceil(count / perPage);
  const page = props.page;
  return (
    <PaginationStyles data-test="pagination">     
      <Link        
        href={{
          pathname: 'links',
          query: { page: page - 1 }
        }}
      >
        <a className="prev" aria-disabled={page <= 1}>
          ← Prev
        </a>
      </Link>
      <p>
        Page {props.page} of
        <span className="totalPages"> {pages}</span>
      </p>
      <p>{count} Items Total</p>
      <Link       
        href={{
          pathname: 'links',
          query: { page: page + 1 }
        }}
      >
        <a className="next" aria-disabled={page >= pages}>
          Next →
        </a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
export { PAGINATION_QUERY };
