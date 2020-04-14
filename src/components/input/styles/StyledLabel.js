import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import palette from '../../../theme-palette';

export default styled(motion.label)`
  position: absolute;
  top: 0;
  left: 0;

  font-size: 3vh;
  line-height: 5vh;

  color: ${palette.uiLight};

  pointer-events: none;

  /* if the input is disabled set the opacity to 0.5, otherwise leave as normal */
  ${props =>
    props.disabled
      ? css`
          opacity: 0.5;
        `
      : ''}
`;
