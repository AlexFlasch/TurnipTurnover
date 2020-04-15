import styled from 'styled-components';
import { motion } from 'framer-motion';

import palette from '../../../theme-palette';

export default styled(motion.nav)`
  position: absolute;
  top: 0;
  left: 0;
  width: 75px;
  height: 100%;
  z-index: 5;
  background-color: ${palette.uiDarker};

  .nav-bg {
    height: 100%;
    width: 100%;
    background-image: linear-gradient(-255deg, #a8ff78 0%, #78ffd6 100%);
    opacity: 0.7;
  }

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
  }
`;
