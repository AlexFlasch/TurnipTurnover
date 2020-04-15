import styled from 'styled-components';

import palette from '../../../../../theme-palette';

export default styled.div`
  display: grid;
  grid-template-columns: 40px 40px auto 40px 40px;

  background-color: ${palette.uiDark};
  color: ${palette.uiLight};
  border-radius: 0 0 5px 5px;
`;
