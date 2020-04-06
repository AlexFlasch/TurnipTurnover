import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getColorsForButtonType } from './styles/utilFunctions';

import { StyledButton, StyledButtonBubble } from './styles/StyledButton';

const Button = props => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonColors = getColorsForButtonType(props.type);

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
        type={props.type}
        variants={bubbleVariants}
        initial="unhovered"
        animate={isHovered && !props.disabled ? 'hovered' : 'unhovered'}
      />
    </StyledButton>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['standard', 'primary']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  onDisabledClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'standard',
  onClick: () => {},
  onDisabledClick: () => {},
  disabled: false,
};

export default Button;
