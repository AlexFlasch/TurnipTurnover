import styled from 'styled-components';

import palette from '../../../theme-palette';

export default styled.figure`
  min-width: ${palette.scale(1)};
  height: ${palette.scale(1)};

  font-size: ${palette.scale(1)};
  margin: 0;
  padding: ${palette.scale(-5)};

  color: #000;
  opacity: 0.6;
`;
