import styled from 'styled-components';

import palette from '../../../theme-palette';

export default styled.div`
  .empty-display {
    color: ${palette.uiLight};
    font-size: ${palette.scale(1.25)};
    text-align: center;
    padding: 25px 0;
  }
`;
