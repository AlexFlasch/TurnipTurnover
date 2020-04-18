import React, { cloneElement, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

// styled components
import StyledSideNav from './styles/StyledSideNav';
import StyledSideNavItem from '../sidenav-item/styles/StyledSideNavItem';
import StyledItemIcon from '../sidenav-item/styles/StyledItemIcon';

const SideNav = props => {
  const [navState, setNavState] = useState('closed');

  const variants = {
    closed: {
      width: '75px',
      boxShadow: '0 0 0 rgba(0,0,0,0), 0 0 0 rgba(0,0,0,0)',
    },
    open: {
      width: '300px',
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    },
  };

  const handleNavClick = () => {
    setNavState('closed');
  };

  const toggleNavState = () => {
    if (navState === 'open') {
      setNavState('closed');
    } else {
      setNavState('open');
    }
  };

  return (
    <StyledSideNav
      whileHover={{
        width: '300px',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      }}
      variants={variants}
      initial="closed"
      animate={navState}
    >
      <motion.div className="nav-bg" whileHover={{ opacity: 1 }}>
        <ul>
          <StyledSideNavItem className="mobile-menu" onClick={toggleNavState}>
            <button type="button">
              <StyledItemIcon
                className={`lnr ${
                  navState === 'closed' ? 'lnr-menu' : 'lnr-cross'
                }`}
              />
            </button>
          </StyledSideNavItem>
          {React.Children.map(props.children, child => {
            if (child) {
              const moddedChild = cloneElement(child, {
                handleNavClick,
              });
              return moddedChild;
            }
          })}
        </ul>
        {props.bottomItem}
      </motion.div>
    </StyledSideNav>
  );
};

SideNav.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  bottomItem: PropTypes.node,
};

export default SideNav;
