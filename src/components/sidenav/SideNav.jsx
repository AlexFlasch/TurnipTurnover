import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

// styled components
import StyledSideNav from './styles/StyledSideNav';

const SideNav = props => {
  return (
    <StyledSideNav
      whileHover={{
        width: '300px',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      }}
    >
      <motion.div className="nav-bg" whileHover={{ opacity: 1 }}>
        <ul>{props.children}</ul>
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
