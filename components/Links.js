import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';

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

const Links = () => {
  const { data, loading, error } = useQuery(USER_LINKS_QUERY);
  const [
    deleteLink,
    { loading: deleteLinkLoading, deleteLinkError, deleteLinkData }
  ] = useMutation(DELETE_LINK_MUTATION, {
    refetchQueries: [{ query: USER_LINKS_QUERY }],
    awaitRefetchQueries: true
  });
  const onDeleteClick = async id => {
    alert(`Clicked ${id}`);
    await deleteLink({
      variables: {
        id
      }
    });
  };
  if (loading) return <div>Loading...</div>;
  if (!data || data.userLinks.length < 1) {
    return <div>You haven't saved any links yet.</div>;
  }
  return <div>{data.userLinks.map(link => {
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
  })}</div>;
};

export default Links;
