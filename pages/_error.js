import React, { useEffect } from 'react';
import Router, {useRouter }from 'next/router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { validateUrl } from '../lib/utils';
import { CREATE_LINK_MUTATION } from '../components/CreateLink';
import Error from '../components/ErrorMessage';

function CustomError({ statusCode, urlToSave, cookie }) {
  const router = useRouter();
  let tmpUrl = '';
  let url = [];
  let category;
  let token;  

  const [createLink, { data, loading, error }] = useMutation(CREATE_LINK_MUTATION);

  useEffect(async () => {            
      if (cookie && cookie.includes('token=')) {
          // Assume user is logged in because cookie is present
          token = cookie.split('token=')[1];
          //console.log('TOKEN', token);
      }
    
      if (urlToSave) {
          tmpUrl = urlToSave.replace(/^\/|\/$/g, '');
          // check and see if a category was entered (i.e., url is preceded by '--')
          //console.log('URL TO SAVE', tmpUrl);
          if(tmpUrl.includes('--')) {              
              url = tmpUrl.split('--')[1];
              category = tmpUrl.split('--')[0];
          } else {
              url = tmpUrl;
          }          
          //console.log('URL and Cat', url, category); 
          await createLink({ variables: { url, category }});
         
      }      
  }, []);

  if(data) console.log("DATA", data);  

  console.log(validateUrl(urlToSave.replace(/^\/|\/$/g, ''))); 
  return (
    <div>
        <h2>Sorry, there was an error - {statusCode}</h2>
        <Error error={error} />
    </div>
  );
}

const getInitialProps = (ctx) => {  
  let statusCode;
  let urlToSave;
  let cookie;  
  // If the res variable is defined it means nextjs
  // is in server side 
  if (ctx.res) {    
    statusCode = ctx.res.statusCode;     
    // A 404 status code could mean that a user entered  linxify.net in front
    // of a url they were at and pressed enter. To  handle this, we need to
    // check and see if the route can be parsed to detect a valid url
    if(statusCode === 404) {
        // this will get passed on to the client when the component
        // mounts, at which point we will check the url and run
        // a mutation to add the link if the url is valid
        urlToSave = ctx.req.url;       
        cookie = ctx.req.headers.cookie; 
    }
    // if (statusCode === 404) {
    //   console.log(`CANNOT FIND URL ${req.url}`)
    //   console.log("COOKIES", req.headers.cookie.split('=')[1]);
    //   res.writeHead(302, {
    //     Location: '/'
    //   });
    //   res.end();
    // }
  } else if (err) {
    // if there is any error in the app it should
    // return the status code from here
    statusCode = err.statusCode;
  } else {
    // Something really bad/weird happen and status code
    // cannot be determined.
    statusCode = null;   
    Router.push('/');
  }
  return { statusCode, urlToSave, cookie};
}

CustomError.getInitialProps = getInitialProps;

export default CustomError;
