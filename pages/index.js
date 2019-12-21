import React from 'react';
import Links from '../components/Links';
import PleaseSignIn from '../components/PleaseSignIn';

const  Home = props => {
  return (
   
    <PleaseSignIn>
      <Links />
    </PleaseSignIn>
  )
};

export default Home;