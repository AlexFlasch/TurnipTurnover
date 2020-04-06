import palette from '../../../theme-palette';

export const getColorsForButtonType = type => {
  switch (type) {
    case 'primary':
      return {
        bg: palette.transparent,
        border: palette.accentMint,
        hoverBorderColor: palette.transparent,
        color: palette.accentMint,
        hoverColor: palette.uiDark,
      };

    case 'standard':
    default:
      return {
        bg: palette.transparent,
        border: palette.uiLight,
        hoverBorderColor: palette.transparent,
        color: palette.uiLight,
        hoverColor: palette.uiDark,
      };
  }
};
