import styled from 'styled-components';
import { motion } from 'framer-motion';

import palette from '../../../theme-palette';

export default styled(motion.input)`
  background: none;
  border: 0;
  padding: 0;

  height: 5vh;
  width: 100%;
  font-size: 3vh;

  outline: none;

  z-index: 2;

  color: ${palette.uiLight};
`;
