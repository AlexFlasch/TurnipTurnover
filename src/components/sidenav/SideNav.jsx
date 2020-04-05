import React, { useContext } from 'react';
import AuthContext from '../../contexts/auth';

// styled components
import StyledSideNav from './styles/StyledSideNav';

const SideNav = props => {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <StyledSideNav
      whileHover={{
        width: '20vw',
        opacity: 1,
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      }}
    >
      <ul>{props.children}</ul>
    </StyledSideNav>
  );
};

export default SideNav;
