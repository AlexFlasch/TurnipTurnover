import styled from 'styled-components';

import palette from '../../../theme-palette';

export default styled.div`
  height: 100%;
  font-size: 2vh;
  padding: 1.5vh;
  color: ${({ isFocused }) =>
    isFocused ? palette.accentMint : palette.uiLight};
`;
