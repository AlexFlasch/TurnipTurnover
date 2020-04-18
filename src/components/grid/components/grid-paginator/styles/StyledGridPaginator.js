import styled from 'styled-components';

import palette from '../../../../../theme-palette';

export default styled.div`
  display: grid;
  grid-template-columns: ${palette.scale(3)} ${palette.scale(3)} auto ${palette.scale(
      3,
    )} ${palette.scale(3)};
  align-items: center;
  height: ${palette.scale(3)};

  border-top: 1px solid ${palette.uiDark};

  background-color: ${palette.uiDarker};
  color: ${palette.uiLight};
  border-radius: 0 0 5px 5px;

  .page-select {
    justify-self: center;
    align-self: flex-end;

    p {
      display: inline-block;
      height: 100%;
      margin: 0;
      margin-right: 5px;
      align-self: flex-end;
    }
  }
`;
