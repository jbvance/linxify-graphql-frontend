import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Error from '../components/ErrorMessage';

const StyledCategory = styled.div`
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

export const USER_CATEGORIES_QUERY = gql`
  query USER_CATEGORIES_QUERY {
    userCategories {
      id
      name
    }
  }
`;

export const DELETE_CATEGORY_MUTATION = gql`
  mutation DELETE_CATEGORY_MUTATION($id: ID!) {
    deleteCategory(id: $id) {
      id
      name
    }
  }
`;


const Categories = () => {
  const [deleteError, setDeleteError] =  useState(null);
  const { data, loading, error } = useQuery(USER_CATEGORIES_QUERY);
  const [
    deleteCategory,
    { loading: deleteCategoryLoading, deleteCategoryError, deleteCategoryData }
  ] = useMutation(DELETE_CATEGORY_MUTATION, {
    refetchQueries: [{ query: USER_CATEGORIES_QUERY }],
    awaitRefetchQueries: true
  });
  const onDeleteClick = async id => {
    if (!confirm('Are you sure you want to delete this category?')) {
        return;
    }
    try {
        await deleteCategory({
            variables: {
              id
            }
          });
    } catch (err) {      
        setDeleteError(err);
    }
    
  };
  if (loading) return <p>Loading...</p>;  
  return (
    <div>
      <Error error={error} />
      <Error error={deleteError} />
      {data.userCategories.map(category => {
        return (
          <div key={category.id}>
            <StyledCategory>
              <div className="url-text">
                <Link href={`/category-links/${category.id}`}>
                  <a>{category.name}</a>
                </Link>
              </div>
              <div className="button-row">
                <div className="button-link">
                  <Link href={`/category/${category.id}`}>
                    <a className="button">Edit</a>
                  </Link>
                </div>
                <div className="button-link">
                  <Link href="#">
                    <a
                      className="button"
                      onClick={() => onDeleteClick(category.id)}
                    >
                      Delete
                    </a>
                  </Link>
                </div>
              </div>
            </StyledCategory>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
