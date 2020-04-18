import styled from 'styled-components';

import palette from '../../../theme-palette';

export default styled.div`
  position: relative;

  width: 100%;

  label {
    position: absolute;
    top: -${palette.scale(1)};
    left: 0;
    font-size: ${palette.scale(0)};
    color: ${palette.uiLight};
    opacity: ${props => (props.disabled ? 0.3 : 1)};
  }
`;
