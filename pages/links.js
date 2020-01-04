import React from 'react';
import Links from '../components/Links';
import PleaseSignIn from '../components/PleaseSignIn';
import AllLinks from '../components/AllLinks';

const  LinksPage = props => {    
  return (
    <PleaseSignIn>
      <AllLinks page={parseFloat(props.query.page) || 1 } />
    </PleaseSignIn>
  )
};

export default LinksPage;