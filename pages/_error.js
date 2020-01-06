import React, { useEffect } from 'react';
import Router, {useRouter }from 'next/router';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { validateUrl } from '../lib/utils';
import { CREATE_LINK_MUTATION } from '../components/CreateLink';
import { USER_LINKS_QUERY } from '../components/Links';
import Error from '../components/ErrorMessage';
import { CURRENT_USER_QUERY } from '../components/PleaseSignIn';

function CustomError({ statusCode, urlToSave }) {
  const router = useRouter();
  let tmpUrl = '';
  let url = [];
  let category;
  let token;  
  let loggedIn = false;
  let me = null;

  const [createLink, { error }] = useMutation(CREATE_LINK_MUTATION, {
    refetchQueries: [{ query: USER_LINKS_QUERY}],
    awaitRefetchQueries: true
  });

  const [checkMe, { client, data }] = useLazyQuery(CURRENT_USER_QUERY);

  useEffect(() => {   
      console.log('DATA1', data);        
    
      async function checkLoggedIn() {      
        await checkMe();              
      }

      checkLoggedIn();            
            
  }, []);
  
  useEffect(() => {
    async function fetchCreateLink() {
        await createLink({ variables: { url, category }});
        localStorage.removeItem('linkToSave');       
        router.push('/');
    }
    
     if (data && data.me && data.me.id) {
        loggedIn = true;
      }
    
     if (urlToSave) {
          //console.log('urlToSave', urlToSave);
          tmpUrl = urlToSave.replace(/^\/|\/$/g, '')       
         // console.log("tmpUrl", tmpUrl);
          // check and see if a category was entered (i.e., url is preceded by '--')          
          if(tmpUrl.includes('--')) {              
              url = tmpUrl.split('--')[1];
              category = tmpUrl.split('--')[0];
          } else {
              url = tmpUrl;
          } 
          // some Unix systems replace // with / in url, so need to convert back to // before saving
           url = url.includes('https') ? url.replace(/^(https):\/+/gi, 'https://') : url.includes('http') ?  url.replace(/^(http):\/+/gi, 'http://') : url;
           console.log("URL AFTER REPLACE", url);
          //console.log('URL and Cat', url, category); 
          
          if (loggedIn) {
            fetchCreateLink();
          } else {
            //save to localStorage and redirect to login screen (we'll save the link after user logs in)            
            const lsLink = { url, category }           
            localStorage.setItem('linkToSave', JSON.stringify(lsLink));
            router.push('/');
           
          }                  
      }       
  }, [data]);
 
  //console.log(validateUrl(urlToSave.replace(/^\/|\/$/g, ''))); 
  return (
    <div>
        {statusCode !== 404 ? <h2>Sorry, there was an error - {statusCode}</h2> : <h4>Attempting to save link...</h4>}
        <Error error={error} />
    </div>
  );
}

const getInitialProps = (ctx) => {  
  let statusCode;
  let urlToSave;  
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
        console.log('urlToSave', urlToSave);                     
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
  return { statusCode, urlToSave };
}

CustomError.getInitialProps = getInitialProps;

export default CustomError;
