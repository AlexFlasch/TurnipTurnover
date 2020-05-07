import styled from 'styled-components';
import { motion } from 'framer-motion';

import palette from '../../../theme-palette';

export default styled(motion.div)`
  position: relative;

  margin: ${palette.scale(1)} 0;

  .validation-msg {
    position: absolute;
    bottom: -${palette.scale(1.5)};
    left: 0;
    font-size: ${palette.scale(-1)};

    &.valid {
      color: ${palette.accentLime};
    }

    &.invalid {
      color: ${palette.error};
    }
  }
`;
