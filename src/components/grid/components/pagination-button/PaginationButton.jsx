import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import palette from '../../../../theme-palette';
import StyledPaginationButton from './styles/StyledPaginationButton';

const PaginationButton = props => {
  const [variant, setVariant] = useState('initial');

  useEffect(() => {
    props.disabled ? setVariant('disabled') : setVariant('initial');
  }, [props.disabled]);

  const variants = {
    initial: {
      borderBottomWidth: '1px',
      borderBottomColor: palette.uiLight,
    },
    hover: {
      borderBottomWidth: '3px',
      borderBottomColor: palette.accentGreen,
    },
    disabled: {
      borderBottomWidth: '0px',
      borderBottomColor: palette.uiLight,
    },
  };

  return (
    <StyledPaginationButton
      {...props}
      className={props.disabled ? 'disabled' : ''}
      variants={variants}
      initial="initial"
      animate={variant}
      onMouseEnter={() => !props.disabled && setVariant('hover')}
      onMouseLeave={() => setVariant('initial')}
      onClick={props.handleClick}
    >
      {props.children}
    </StyledPaginationButton>
  );
};

PaginationButton.propTypes = {
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
};

PaginationButton.defaultProps = {
  handleClick: () => {},
  disabled: false,
};

export default PaginationButton;
