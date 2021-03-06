import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { getColorsForButtonType } from '../styles/utilFunctions';

export const StyledButton = styled(motion.button)(props => {
  const colors = getColorsForButtonType(props.color);

  return css`
    position: relative;
    display: inline-block;
    cursor: pointer;
    backface-visibility: hidden;
    padding: 10px 20px;
    margin: 10px;
    font-size: 2vh;
    overflow: hidden;
    border: 1px solid ${colors.border};
    background-color: ${colors.bg};
    border-radius: 5px;
    color: ${colors.color};

    span {
      position: relative;
    }

    &:hover {
      color: ${colors.hoverColor};
    }

    &.disabled,
    &[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
});

export const StyledButtonBubble = styled(motion.div)(props => {
  const colors = getColorsForButtonType(props.color);

  return css`
    pointer-events: none;
    position: absolute;
    top: -25%;
    left: -25%;
    width: 150%;
    height: 150%;
    border-radius: 100%;
    background-color: ${colors.border};
    transform: scale(0);
  `;
});
