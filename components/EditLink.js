import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LinkForm from './LinkForm';

export const EDIT_LINK_MUTATION = gql`
  mutation EDIT_LINK_MUTATION(
    $id: ID!
    $url: String!
    $title: String
    $favIcon: String
    $note: String
    $category: String
  ) {
    updateLink(
      id: $id
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

const EditLink = ({ link }) => {    

  return (
      <LinkForm link={link} mutation={EDIT_LINK_MUTATION}/>
  )
};

export default EditLink;