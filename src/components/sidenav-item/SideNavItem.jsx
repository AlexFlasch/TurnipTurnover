import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import StyledSideNavItem from './styles/StyledSideNavItem';
import StyledItemIcon from './styles/StyledItemIcon';

const SideNavItem = props => (
  <StyledSideNavItem>
    <Link to={props.to} onClick={props.handleNavClick}>
      <StyledItemIcon className={`lnr ${props.icon}`} />
      <span>{props.text}</span>
    </Link>
  </StyledSideNavItem>
);

SideNavItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  to: PropTypes.string,
};

export default SideNavItem;
