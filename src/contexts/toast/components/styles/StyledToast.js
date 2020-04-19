import styled from 'styled-components';
import { motion } from 'framer-motion';

import palette from '../../../../theme-palette';

const getColorsForToastType = type => {
  switch (type) {
    case 'success':
      return {
        color: palette.bg,
        bgColor: palette.accentGreen,
      };

    case 'error':
      return {
        color: palette.bg,
        bgColor: palette.error,
      };

    case 'neutral':
    default:
      return {
        color: palette.uiLight,
        bgColor: palette.uiDark,
      };
  }
};

export default styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${palette.scale(10)};
  min-height: ${palette.scale(5)};
  margin: ${palette.scale(0)};
  padding: 15px;

  background-color: ${props => getColorsForToastType(props.type).bgColor};
  border-radius: 5px;
  box-shadow: ${palette.cardShadow};

  pointer-events: auto;

  .dismiss-btn {
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
    color: ${props => getColorsForToastType(props.type).color};
    cursor: pointer;
  }

  .toast-message {
    color: ${props => getColorsForToastType(props.type).color};
  }
`;
