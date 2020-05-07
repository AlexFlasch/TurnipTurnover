import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import palette from '../../theme-palette';

import StyledToggle from './styles/StyledToggle';

const knobVariants = {
  on: {
    backgroundColor: palette.accentMint,
    x: '110%',
  },
  off: {
    backgroundColor: palette.uiLight,
    x: '20%',
  },
};

const toggleVariants = {
  unfocused: {
    boxShadow: `0 0 10px ${palette.transparent}, 0 0 15px ${
      palette.transparent
    }`,
  },
  focused: {
    boxShadow: `0 0 10px ${palette.accentGreen}, 0 0 15px ${
      palette.transparent
    }`,
  },
};

const Toggle = props => {
  const [toggleState, setToggleState] = useState(props.defaultValue ?? false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleClick = event => {
    props.handleChange(event.target.checked);
    setToggleState(event.target.checked);
  };

  return (
    <StyledToggle>
      <span className="top-label">{props.topLabel}</span>
      <div className="toggle-container">
        <span className="off-label">{props.offLabel}</span>
        <motion.div
          className="toggle-ui"
          variants={toggleVariants}
          initial="unfocused"
          animate={isFocused ? 'focused' : 'unfocused'}
        >
          <input
            className="toggle-input"
            type="checkbox"
            onChange={toggleClick}
            checked={toggleState}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <motion.div
            variants={knobVariants}
            initial={props.defaultValue ?? false ? 'on' : 'off'}
            animate={toggleState ? 'on' : 'off'}
            className={`toggle-knob ${toggleState ? 'on' : 'off'}`}
          />
        </motion.div>
        <span className="on-label">{props.onLabel}</span>
      </div>
    </StyledToggle>
  );
};

Toggle.propTypes = {
  handleChange: PropTypes.func,
  topLabel: PropTypes.string,
  offLabel: PropTypes.string,
  onLabel: PropTypes.string,
  defaultValue: PropTypes.bool,
};

Toggle.defaultProps = {
  handleChange: () => {},
  topLabel: '',
  offLabel: 'off',
  onLabel: 'on',
};

export default Toggle;
