import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const CREATE_LINK_MUTATION = gql`
    mutation CREATE_LINK_MUTATION ($url: String!, $title: String, $favIcon: String, $note: String, $category: String) {
    createLink (url: $url, title: $title, favIcon: $favIcon, note: $note, category: $category) {
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

const CreateLink = () => {
    return (
        <div>
            
        </div>
    );
};

export default CreateLink;