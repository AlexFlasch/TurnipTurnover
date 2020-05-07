import { css } from 'styled-components';

import palette from '../../../theme-palette';

export default type => {
  switch (type) {
    case 'primary':
      return css`
        background-color: ${palette.accentMint};
        color: ${palette.uiDarker};
      `;

    case 'standard':
      return css`
        background-color: ${palette.uiLight};
        color: ${palette.uiDarker};
      `;

    case 'success':
      return css`
        background-color: ${palette.accentLime};
        color: ${palette.uiDarker};
      `;

    case 'warning':
      return css`
        background-color: ${palette.warning};
        color: ${palette.uiDarker};
      `;

    case 'error':
      return css`
        background-color: ${palette.error};
        color: ${palette.uiDarker};
      `;

    default:
      return css`
        background-color: ${palette.uiLight};
        color: ${palette.uiDarker};
      `;
  }
};
