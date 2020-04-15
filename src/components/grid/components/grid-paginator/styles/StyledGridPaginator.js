import styled from 'styled-components';

import palette from '../../../../../theme-palette';

export default styled.div`
  display: grid;
  grid-template-columns: 40px 40px auto 40px 40px;
  align-items: center;

  border-top: 1px solid ${palette.uiDark};

  background-color: ${palette.uiDarker};
  color: ${palette.uiLight};
  border-radius: 0 0 5px 5px;

  .page-select {
    justify-self: center;
    height: 40px;

    p {
      display: inline-block;
      height: 100%;
      margin: 0;
      margin-right: 5px;
      align-self: flex-end;
    }
  }
`;
