import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import palette from '../../../theme-palette';

export default styled(motion.input)`
  background-color: ${palette.uiDark};
  border: 0;
  border-radius: 5px 5px 0 0;

  padding: 0;
  padding-left: 5px;
  height: ${palette.scale(2)};
  width: 100%;
  font-size: ${palette.scale(1)};
  font-family: ${palette.font};

  outline: none;

  z-index: 2;

  color: ${palette.uiLight};

  /* if the input is disabled set the opacity to 0.5, otherwise leave as normal */
  ${props =>
    props.disabled
      ? css`
          opacity: 0.3;
          cursor: not-allowed;
        `
      : ''}
`;
