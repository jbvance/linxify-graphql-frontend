import React from 'react';
import Link from 'next/link';
import Nav from './Nav';
import styled from 'styled-components';
import Search from './Search';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
 font-family: 'Orbitron', sans-serif;
 letter-spacing: 0.5rem;
 text-transform: uppercase;
 a {
   padding: 0.5rem 1rem;
   text-decoration: none;
  color: ${props => props.theme.green};
}
@media(max-width: 1300px) {
  margin: 0;
  text-align: center;
}
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media(max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightGrey}
}
`;

const Header = () => {
  return(
    <StyledHeader>
      <div className="bar">
        <Logo>
         <Link href="/">
          <a>Linxify</a>
        </Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <Search />
      </div>
   </StyledHeader>
  );
};

export default Header;