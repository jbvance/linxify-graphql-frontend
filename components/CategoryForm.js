import React, { useState }from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import Form from '../components/styles/Form';
import Error from '../components/ErrorMessage';
import USER_CATEGORY_QUERY from './EditCategory';
import { USER_CATEGORIES_QUERY } from './LinkForm';

const CategoryForm = ({ category, header, mutation }) => {
  const router = useRouter();
  const [categoryFunction, { loading, error, data }] = useMutation(mutation, {
    refetchQueries: [{ query: USER_CATEGORIES_QUERY }],
    awaitRefetchQueries: true
  });

  const [formState, setFormState] = useState({
    name: category.name || ''
  });

  const saveToState = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  return (
    <Form
      method="POST"
      onSubmit={async e => {
        e.preventDefault();
        const variables = {
          name: formState.name
        };
        if (category.id) {
          variables['id'] = category.id;
        }
        console.log('CATEGORY FUNCTION', categoryFunction);
        try {
            await categoryFunction({
                variables
              });
        } catch(err) {
            console.log('ERROR', err);
        }
       
        !error && router.push('/categories');
      }}
    >
      <h2>{header}</h2>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
          Name
          <input
            required
            type="text"
            name="name"
            placeholder="Enter a Category Name"
            value={formState.name}
            onChange={saveToState}
          />
        </label>
        <button type="submit">Submit{loading ? 'ting' : ''}</button>
      </fieldset>
    </Form>
  );
};

export default CategoryForm;
