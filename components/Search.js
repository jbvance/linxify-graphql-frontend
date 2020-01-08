import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import Link from 'next/link';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_LINKS_QUERY = gql`
  query SEARCH_LINKS_QUERY($searchString: String!) {
   searchUserLinks(searchString: $searchString) {
      id      
      title
      url
      favIcon
    }
  }
`;

function routeToLink(link) {
  // IGNORE FOR NOW, we are letting the user choose to edit go straight to the url via the browser in a new
  return;
//   Router.push({
//     pathname: `/link/${link.id}`    
//   });
}

class AutoComplete extends React.Component {
  state = {
    userLinks: [],
    loading: false,
  };
  onChange = debounce(async (e, client) => {
    console.log('Searching...');
    // turn loading on
    this.setState({ loading: true });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_LINKS_QUERY,
      variables: { searchString: e.target.value },
    });   
    this.setState({
      userLinks: res.data.searchUserLinks,
      loading: false,
    });
  }, 350);
  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift onChange={routeToLink} itemToString={item => (item === null ? '' : item.title)}>
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search For An Item',
                      id: 'search',
                      className: this.state.loading ? 'loading' : '',
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      },
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.userLinks.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img width="50" src={item.favIcon || "/static/website-icon.png"} alt={item.title} />
                      {item.title}
                      <Link href={`/link${item.id}`}>
                         <button>Edit</button>
                      </Link>
                      <a className="button" href={item.url} target="_blank">Go!</a>
                    </DropDownItem>
                  ))}
                  {!this.state.userLinks.length &&
                    !this.state.loading && <DropDownItem> Nothing Found {inputValue}</DropDownItem>}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default AutoComplete;