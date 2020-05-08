import { css } from 'styled-components';

import palette from '../../../theme-palette';

export default type => {
  switch (type) {
    case 'primary':
      return css`
        background-image: linear-gradient(
          -200deg,
          ${palette.accentMint} 0%,
          ${palette.accentMintDark} 100%
        );
        color: ${palette.bg};
      `;

    case 'standard':
      return css`
        background-image: linear-gradient(
          -200deg,
          ${palette.uiLight} 0%,
          ${palette.accentPaleBlue} 100%
        );
        color: ${palette.bg};
      `;

    case 'success':
      return css`
        background-image: linear-gradient(
          -200deg,
          ${palette.success} 0%,
          ${palette.successDark} 100%
        );
        color: ${palette.bg};
      `;

    case 'warning':
      return css`
        background-image: linear-gradient(
          -200deg,
          ${palette.warning} 0%,
          ${palette.warningDark} 100%
        );
        color: ${palette.bg};
      `;

    case 'error':
      return css`
        background-image: linear-gradient(
          -200deg,
          ${palette.error} 0%,
          ${palette.errorDark} 100%
        );
        color: ${palette.bg};
      `;

    default:
      return css`
        background-image: linear-gradient(
          -200deg,
          ${palette.uiLight} 0%,
          ${palette.accentPaleBlue} 100%
        );
        color: ${palette.bg};
      `;
  }
};
