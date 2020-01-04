import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { USER_CATEGORY_LINKS_QUERY } from './UserCategoryLinks';

const StyledLink = styled.div`
  background-color: #fcfcfc;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  min-height: 50px;
  padding: 10px;
  border-bottom: 1px solid #808080;
  .fav-icon {
    margin: 10px;
    img {
      max-width: 25px;
      height: auto;
    }
  }
  .url-text {
    flex: 1 1 auto;
  }
  .button-row {
    display: flex;
    flex-direction: row;
    margin-right: 10px;
    .button-link {
      background-color: ${props => props.theme.green};
      margin: 5px;
      color: white;
    }
    .button {
      padding: 0 10px;
      border-radius: 2px;
      color: white;
    }
  }
  @media only screen and (max-width: 350px) {
    flex-direction: column;
  }
`;

export const USER_LINKS_QUERY = gql`
  query USER_LINKS_QUERY {
    userLinks {
      id
      url
      title
      favIcon
    }
  }
`;

export const DELETE_LINK_MUTATION = gql`
  mutation DELETE_LINK_MUTATION($id: ID!) {
    deleteLink(id: $id) {
      id
      url
    }
  }
`;

const displayLinks = links => {
  return links.map(link => {
    return (
      <div key={link.id}>
        <StyledLink>
          <div className="fav-icon">
            <img src={link.favIcon} alt={link.title} />
          </div>
          <div className="url-text">
            <a href={link.url}>{link.title}</a>
          </div>
          <div className="button-row">
            <div className="button-link">
              <Link href={`/link/${link.id}`}>
                <a className="button">Edit</a>
              </Link>
            </div>
            <div className="button-link">
              <Link href="#">
                <a className="button" onClick={() => onDeleteClick(link.id)}>
                  Delete
                </a>
              </Link>
            </div>
          </div>
        </StyledLink>
      </div>
    );
  });
};

const Links = ({ links, categoryId }) => {

  const refetchQueriesArray = [
    { query: USER_LINKS_QUERY }
  ];

  // If on links by categories page, add query to refetch 
  // links by categoryId if a link is deleted
  if (categoryId) {
    refetchQueriesArray.push({query: USER_CATEGORY_LINKS_QUERY,
      variables: {
        categoryId
      }
    });
  }

  const [
    deleteLink,
    { loading: deleteLinkLoading, deleteLinkError, deleteLinkData }
  ] = useMutation(DELETE_LINK_MUTATION, {
    refetchQueries: refetchQueriesArray,    
  });
  const onDeleteClick = async id => {
    if (!confirm('Are you sure you want to delete this link?')) {
        return;
    }
    await deleteLink({
      variables: {
        id
      }
    });
  };
 
  if (!links || links.length < 1) {
    return <div>You haven't saved any links yet.</div>;
  }
  return (
    <div>
      {links.map(link => {
        return (
          <div key={link.id}>
            <StyledLink>
              <div className="fav-icon">
                <img
                  src={link.favIcon || '/static/website-icon.png'}
                  alt={link.title}
                />
              </div>
              <div className="url-text">
                <a href={link.url}>{link.title}</a>
              </div>
              <div className="button-row">
                <div className="button-link">
                  <Link href={`/link/${link.id}`}>
                    <a className="button">Edit</a>
                  </Link>
                </div>
                <div className="button-link">
                  <Link href="#">
                    <a
                      className="button"
                      onClick={() => onDeleteClick(link.id)}
                    >
                      Delete
                    </a>
                  </Link>
                </div>
              </div>
            </StyledLink>
          </div>
        );
      })}
    </div>
  );
};

export default Links;
