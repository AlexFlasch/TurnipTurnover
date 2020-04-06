import styled from 'styled-components';
import { motion } from 'framer-motion';

import palette from '../../../theme-palette';

export default styled(motion.div)`
  position: relative;

  margin: 3.5vh 0;

  .validation-msg {
    position: absolute;
    bottom: -1.25em;
    left: 0;
    font-size: 0.75em;

    &.valid {
      color: ${palette.accentGreen};
    }

    &.invalid {
      color: ${palette.error};
    }
  }
`;
