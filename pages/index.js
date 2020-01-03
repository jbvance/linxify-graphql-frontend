import React from 'react';
import Links from '../components/Links';
import PleaseSignIn from '../components/PleaseSignIn';
import AllLinks from '../components/AllLinks';

const  Home = props => {    
  return (
   
    <PleaseSignIn>
      <AllLinks />
    </PleaseSignIn>
  )
};

export default Home;