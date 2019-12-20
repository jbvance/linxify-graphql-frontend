import React from 'react';
import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
  <NavStyles>
     <Link href="/">
        <a>Links</a>
    </Link>
   <Link href="/add-link">
        <a>Add Link</a>
    </Link>
     <Link href="/categr">
        <a>Categories</a>
    </Link>
     <Link href="/add-category">
        <a>Add Category</a>
    </Link>
  </NavStyles>
);

export default Nav;