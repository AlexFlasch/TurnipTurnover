import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getColorsForButtonType } from './styles/utilFunctions';

import { StyledButton, StyledButtonBubble } from './styles/StyledButton';

const Button = props => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonColors = getColorsForButtonType(props.color);

  const buttonVariants = {
    unhovered: {
      color: buttonColors.color,
      borderColor: buttonColors.border,
    },
    hovered: {
      color: buttonColors.hoverColor,
      borderColor: buttonColors.hoverBorderColor,
    },
  };

  const bubbleVariants = {
    unhovered: {
      scale: 0,
    },
    hovered: {
      scale: 1,
    },
  };

  return (
    <StyledButton
      className={props.disabled ? 'disabled' : ''}
      type={props.type}
      color={props.color}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={buttonVariants}
      initial="unhovered"
      animate={isHovered && !props.disabled ? 'hovered' : 'unhovered'}
      onClick={() => {
        props.disabled ? props.onDisabledClick() : props.onClick();
      }}
    >
      <span>{props.text}</span>
      <StyledButtonBubble
        color={props.color}
        variants={bubbleVariants}
        initial="unhovered"
        animate={isHovered && !props.disabled ? 'hovered' : 'unhovered'}
      />
    </StyledButton>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.oneOf(['standard', 'primary']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  onDisabledClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  color: 'standard',
  onClick: () => {},
  onDisabledClick: () => {},
  disabled: false,
};

export default Button;
