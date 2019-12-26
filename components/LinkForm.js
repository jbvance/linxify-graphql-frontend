import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import Form from '../components/styles/Form';
import Error from '../components/ErrorMessage';
import { USER_LINKS_QUERY } from './Links';

export const USER_CATEGORIES_QUERY = gql`
  query USER_CATEGORIES_QUERY {
    userCategories {
      id
      name
    }
  }
`;

const LinkForm = props => {
  const router = useRouter();
  const [linkFunction, { loading, error, data }] = useMutation(props.mutation, {
    refetchQueries: [{ query: USER_LINKS_QUERY }],
    awaitRefetchQueries: true
  });

  const { loading: catLoading, error: catError, data: catData } = useQuery(
    USER_CATEGORIES_QUERY
  );

  const [formState, setFormState] = useState({   
    url: props.link.url || '',
    title: props.link.title || '',
    note: props.link.note || '',
    category: props.link.category || ''
  });

  const saveToState = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!catData || !catData.userCategories) return;

    let noneCategory = catData.userCategories.find(
      category => category.name.toLowerCase() === 'none'
    );
    if (noneCategory) {
      noneCategory = noneCategory.id;
    }

    const defaultCat =
      props.link && props.link.category
        ? // TODO - CHANGE THIS TO GET CATEGORY ID WHEN EDITING A LINK
          props.link.category.id
        : noneCategory;
    //console.log("defaultCat", defaultCat);
    setFormState({ ...formState, category: defaultCat });
  }, [catData]);

  const renderCategoriesSelect = () => {
    //console.log('FORMSTATE', formState.category);
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
        value={formState.category}
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
        const variables = {
          url: formState.url,
          title: formState.title,
          note: formState.note,
          category: formState.category
        };
        if(props.link.id) {
          variables['id'] = props.link.id
        }
        await linkFunction({
          variables
        });
        !error && router.push('/');
      }}
    >
      <h2>{props.header}</h2>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
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
          {catData ? (
            renderCategoriesSelect()
          ) : (
            <p>
              You have no categories. Please create a new category first to
              select one
            </p>
          )}
        </label>
        <button type="submit">Submit{loading ? 'ting' : ''}</button>
      </fieldset>
    </Form>
  );
};

export default LinkForm;
