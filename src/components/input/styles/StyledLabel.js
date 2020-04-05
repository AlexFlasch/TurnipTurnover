import styled from 'styled-components';
import { motion } from 'framer-motion';

import palette from '../../../theme-palette';

export default styled(motion.label)`
  position: absolute;
  top: 0;
  left: 0;

  font-size: 3vh;
  line-height: 5vh;

  color: ${palette.uiLight};
`;
