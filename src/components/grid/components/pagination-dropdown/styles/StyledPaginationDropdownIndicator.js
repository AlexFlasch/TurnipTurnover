import styled from 'styled-components';

import palette from '../../../../../theme-palette';

export default styled.div`
  height: 100%;
  font-size: 14px;
  padding: 13px;
  color: ${({ isFocused }) =>
    isFocused ? palette.accentMint : palette.uiLight};
`;
