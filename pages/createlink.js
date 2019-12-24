import React from 'react';
import PleaseSignIn from '../components/PleaseSignIn';
import CreateLink from '../components/CreateLink';

const  CreateLinkPage = props => {    
  return (
   
    <PleaseSignIn>
      <CreateLink />
    </PleaseSignIn>
  )
};

export default CreateLinkPage;