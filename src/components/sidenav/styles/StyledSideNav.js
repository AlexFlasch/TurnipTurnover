import styled from 'styled-components';
import { motion } from 'framer-motion';

import palette from '../../../theme-palette';

export default styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: ${palette.scale(1)};
  height: 100%;
  z-index: 5;
  background-color: ${palette.uiDarker};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;

  .nav-bg {
    height: 100%;
    width: 100%;
    background-image: linear-gradient(
      -255deg,
      ${palette.success} 0%,
      ${palette.accentMint} 100%
    );
    opacity: 0.7;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
  }

  .mobile-menu {
    display: none;
  }

  ${palette.mobile} {
    .mobile-menu {
      display: block;
    }
  }
`;
