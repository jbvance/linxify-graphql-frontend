import urlRegex from 'url-regex';

export function validateUrl(url) {
    // return false if not a valid url
    console.log('URL', url);
    return urlRegex({
        exact: true
      }).test(url)
   
  };

