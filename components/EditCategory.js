import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CategoryForm from './CategoryForm';

export const EDIT_CATEGORY_MUTATION = gql`
  mutation EDIT_CATEGORY_MUTATION(
    $id: ID!
    $name: String!
  ) {
    updateCategory(
      id: $id
      name: $name
    ) {
      id
      name
    }
  }
`;

export const USER_CATEGORY_QUERY = gql`
  query USER_CATEGORY_QUERY(
    $id: ID!
  ) {
    userCategory(
      id: $id
    ) {
      id
      name
    }
  }
`;


const EditCategory = ({ category }) => {   
 
  console.log('CATEGORY', category);

  return (
      <CategoryForm category={category} header={`Edit Category- ${category.name}`} mutation={EDIT_CATEGORY_MUTATION}/>
  )
};

export default EditCategory;