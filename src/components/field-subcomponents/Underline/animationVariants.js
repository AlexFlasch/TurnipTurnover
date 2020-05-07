import palette from '../../../theme-palette';

export default {
  active: {
    height: 3,
    backgroundColor: palette.accentMint,
    backgroundImage:
      'linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 75%, transparent 75%, transparent 100%)',
    backgroundSize: '10px 0px',
    opacity: 1,
  },
  valid: {
    height: 3,
    backgroundColor: palette.accentLime,
    backgroundImage:
      'linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 75%, transparent 75%, transparent 100%)',
    backgroundSize: '10px 0px',
    opacity: 1,
  },
  invalid: {
    height: 3,
    backgroundColor: palette.error,
    backgroundImage:
      'linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 75%, transparent 75%, transparent 100%)',
    backgroundSize: '10px 0px',
    opacity: 1,
  },
  inactive: {
    height: 1,
    backgroundColor: palette.uiLight,
    backgroundImage:
      'linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 75%, transparent 75%, transparent 100%)',
    backgroundSize: '10px 0px',
    opacity: 1,
  },
  disabled: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    backgroundImage: `linear-gradient(90deg, ${palette.uiLight}, ${
      palette.uiLight
    } 75%, transparent 75%, transparent 100%)`,
    backgroundSize: '10px 1px',
    opacity: 0.3,
  },
};
