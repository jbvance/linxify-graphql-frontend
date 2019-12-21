import React from 'react';
import { useQuery } from '@apollo/react-hooks';
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
`;

const USER_LINKS_QUERY = gql`
  query {
    userLinks {
      url
      title
      favIcon
    }
  }
`;

const displayLinks = (links) => {
    return links.map(link => {
        return(
            <div key={link.id}>
                <StyledLink>
                    <div className="fav-icon">
                        <img src={link.favIcon} alt={link.title} />
                    </div>
                    <div>
                        <a href={link.url}>{link.title}</a>
                    </div>
                </StyledLink>
            </div>
        )
    })
}

const Links = () => {
  const { data, loading, error } = useQuery(USER_LINKS_QUERY);
  if (loading) return <div>Loading...</div>;
  if (data) console.log('LINKS', data);
  if(!data || data.userLinks.length < 1) {
      return <div>You haven't saved any links yet.</div>
  }
  return (
    <div>
        {displayLinks(data.userLinks)}
    </div>
  );
};

export default Links;
