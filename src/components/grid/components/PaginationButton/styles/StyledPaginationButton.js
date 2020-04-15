import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import palette from '../../../../../theme-palette';

export default styled(motion.button)`
  color: ${palette.uiLight};
  border-bottom-width: ${props => (props.disabled ? '0px' : '1px')};
  border-bottom-color: ${palette.uiLight};
  border-bottom-style: solid;

  height: 40px;
  width: auto;

  &.disabled {
    cursor: not-allowed;
  }
`;