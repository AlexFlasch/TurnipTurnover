import palette from '../../../theme-palette';

export default {
  active: {
    y: `-${palette.scale(1.5)}`,
    fontSize: palette.scale(0),
    opacity: 1,
  },
  inactive: {
    y: '0em',
    fontSize: palette.scale(1),
    opacity: 0.5,
  },
  disabled: {
    y: 0,
    fontSize: palette.scale(1),
    opacity: 0.3,
  },
};
