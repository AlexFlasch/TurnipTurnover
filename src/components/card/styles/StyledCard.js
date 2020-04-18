import styled from 'styled-components';

import palette from '../../../theme-palette';

export default styled.div`
  background-color: ${palette.uiDarker};
  color: ${palette.uiLight};
  box-shadow: ${palette.cardShadow};
  border-radius: 5px;
  padding: 15px;
  margin: 15px 0;
`;
