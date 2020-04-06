import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SignInModal from '../sign-in-modal/SignInModal';

import StyledCurrentUserItem from './styles/StyledCurrentUserItem';
import StyledItemIcon from '../sidenav-item/styles/StyledItemIcon';

const SideNavItem = props => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledCurrentUserItem>
      <SignInModal isOpen={isOpen} onBackgroundClick={() => setIsOpen(false)} />
      <button onClick={() => setIsOpen(true)}>
        <StyledItemIcon className={`lnr ${props.icon}`}></StyledItemIcon>
        <span>{props.text}</span>
      </button>
    </StyledCurrentUserItem>
  );
};

SideNavItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  to: PropTypes.string,
};

export default SideNavItem;
