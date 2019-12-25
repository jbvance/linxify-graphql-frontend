import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LinkForm from './LinkForm';

export const CREATE_LINK_MUTATION = gql`
  mutation CREATE_LINK_MUTATION(
    $url: String!
    $title: String
    $favIcon: String
    $note: String
    $category: String
  ) {
    createLink(
      url: $url
      title: $title
      favIcon: $favIcon
      note: $note
      category: $category
    ) {
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

const CreateLink = props => { 
  const link = {
      url: '',
      title: '',
      note: '',
      category: '',      
  };

  return (
      <LinkForm link={link} mutation={CREATE_LINK_MUTATION}/>
  )


};

export default CreateLink;
