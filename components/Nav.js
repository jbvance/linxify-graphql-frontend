import React from 'react';
import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Signout from './Signout';
import NavStyles from './styles/NavStyles';
import { CURRENT_USER_QUERY } from './PleaseSignIn';

const Nav = () => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  if (loading) return <div>...Loading</div>

  if (!data || !data.me) {
    return (
      <Link href="/signup">
        <a>Sign In</a>
      </Link>
    );
  }
 
  if (data && data.me) return (
  <NavStyles>
     <Link href="/">
        <a>Links</a>
    </Link>
   <Link href="/createlink">
        <a>Add Link</a>
    </Link>
     <Link href="/categories">
        <a>Categories</a>
    </Link>
     <Link href="/createcategory">
        <a>Add Category</a>
    </Link>
    <Signout />
  </NavStyles>
)};

export default Nav;