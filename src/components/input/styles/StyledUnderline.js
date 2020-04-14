import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export default styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;

  height: 1px;
  width: 100%;

  pointer-events: none;

  /* if the input is disabled set the opacity to 0.5, otherwise leave as normal */
  ${props =>
    props.disabled
      ? css`
          opacity: 0.5;
        `
      : ''}
`;
