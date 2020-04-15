import styled from 'styled-components';

import palette from '../../../theme-palette';

export default styled.div`
  position: relative;

  width: 100%;

  label {
    position: absolute;
    top: -1.25vh;
    left: 0;
    font-size: 1.5vh;
    color: ${palette.uiLight};
    opacity: ${props => (props.disabled ? 0.3 : 1)};
  }
`;
