import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useRouter, Router } from 'next/router';
import gql from 'graphql-tag';
import Form from '../components/styles/Form';
import Error from '../components/ErrorMessage';
import { USER_LINKS_QUERY } from './Links';

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

export const USER_CATEGORIES_QUERY = gql`
  query USER_CATEGORIES_QUERY {
    userCategories {
      id
      name
    }
  }
`;

const CreateLink = () => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    url: '',
    title: '',
    note: '',
    category: ''
  });

  const { loading: catLoading, error: catError, data: catData } = useQuery(
    USER_CATEGORIES_QUERY
  );

  const [createLink, { loading, error, data }] = useMutation(
    CREATE_LINK_MUTATION,
    {
      refetchQueries: [{ query: USER_LINKS_QUERY }],
      awaitRefetchQueries: true
    }
  );

  const saveToState = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const renderCategoriesSelect = () => {
    let noneCategory = catData.userCategories.find(
      category => category.name.toLowerCase() === 'none'
    );
    if (noneCategory) {
      noneCategory = noneCategory.id;
    }

    // const defaultCategory =
    //   props.link && props.link.category
    //     ? props.link.category._id || props.link.category
    //     : noneCategory;
    const categories = catData.userCategories.map(category => {
      return (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    });

    return (
      <select
        id="category"
        name="category"
        //defaultValue={defaultCategory}
        className="browser-default"
        onChange={saveToState}
      >
        {categories}
      </select>
    );
  };

  return (
    <Form
      method="POST"
      onSubmit={async e => {
        e.preventDefault();
        await createLink({
          variables: {
            url: formState.url,
            title: formState.title,
            note: formState.note,
            category: formState.category
          }
        });
        !error && router.push('/');
      }}
    >
      <h2>Create a New Link</h2>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <Error error={error} />
        <label htmlFor="url">
          Url
          <input
            required
            type="url"
            name="url"
            placeholder="e.g., https://www.google.com"
            value={formState.url}
            onChange={saveToState}
          />
        </label>
        <label htmlFor="title">
          Title
          <input
            required
            type="title"
            name="title"
            placeholder="Title"
            value={formState.title}
            onChange={saveToState}
          />
        </label>
        <label htmlFor="note">
          Description
          <textarea
            id="note"
            name="note"
            placeholder="Enter A Description"
            required
            value={formState.note}
            onChange={saveToState}
          />
        </label>
        <label htmlFor="categories">
            Categories
            {catData ? renderCategoriesSelect() : <p>You have no categories. Please create a new category first to select one</p>}   
        </label>           
        <button type="submit">Submit{loading ? 'ting' : ''}</button>
      </fieldset>      
    </Form>
  );
};

export default CreateLink;
