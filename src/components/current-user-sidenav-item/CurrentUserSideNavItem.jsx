import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/auth';

import SignInModal from '../sign-in-modal/SignInModal';

import StyledCurrentUserItem from './styles/StyledCurrentUserItem';
import StyledItemIcon from '../sidenav-item/styles/StyledItemIcon';

const CurrentUserSideNavItem = props => {
  const { isSignedIn } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const signInButton = (
    <button onClick={() => setIsOpen(true)}>
      <StyledItemIcon className={`lnr ${props.icon}`} />
      <span>{props.text}</span>
    </button>
  );

  const accountPageLink = (
    <Link to="/account">
      <StyledItemIcon className={`lnr ${props.icon}`} />
      <span>{props.text}</span>
    </Link>
  );

  return (
    <StyledCurrentUserItem>
      <SignInModal
        isOpen={isOpen}
        onBackgroundClick={() => setIsOpen(false)}
        handleCloseClick={() => setIsOpen(false)}
        closeModal={closeModal}
      />
      {isSignedIn ? accountPageLink : signInButton}
    </StyledCurrentUserItem>
  );
};

CurrentUserSideNavItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  to: PropTypes.string,
};

export default CurrentUserSideNavItem;
