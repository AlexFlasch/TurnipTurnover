import styled from 'styled-components';

import palette from '../../../../../theme-palette';

export default styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: ${palette.scale(0.25)};
  color: ${({ isFocused }) =>
    isFocused ? palette.accentMint : palette.uiLight};
`;
