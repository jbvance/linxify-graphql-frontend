import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CategoryForm from './CategoryForm';

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CREATE_CATEGORY_MUTATION(
    $name: String!    
  ) {
    createCategory(
      name: $name     
    ) {
      id
      name
    }
  }
`;

const CreateCategory = () => { 
  const category = {
      name: ''    
  };

  return (
      <CategoryForm category={category}  header={'Create New Category'} mutation={CREATE_CATEGORY_MUTATION}/>
  )

};

export default CreateCategory;