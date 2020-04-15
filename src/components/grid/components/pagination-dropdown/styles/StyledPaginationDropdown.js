import palette from '../../../../../theme-palette';

export default longestOption => ({
  container: (provided, state) => ({
    ...provided,
    margin: 0,
    height: '40px',
    fontSize: '1em',
    display: 'inline-block',
  }),
  control: (provided, state) => {
    let borderColor;
    let borderWidth = '3px';
    if (state.isFocused || state.isSelected || state.isActive) {
      borderColor = palette.accentMint;
    } else if (state.selectProps.isValid === false) {
      borderColor = palette.error;
    } else {
      borderWidth = '1px';
    }
    return {
      ...provided,
      height: '40px',
      backgroundColor: palette.transparent,
      color: palette.uiLight,
      border: 0,
      borderRadius: 0,
      borderBottomWidth: borderWidth,
      borderBottomStyle: 'solid',
      borderBottomColor: borderColor,
      boxShadow: 'none',
      opacity: state.isDisabled ? 0.3 : 1,
      '&:hover': {
        borderColor: borderColor,
      },
    };
  },
  input: (provided, state) => ({
    ...provided,
    backgroundColor: palette.transparent,
    color: palette.uiLight,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    paddingLeft: 0,
    width: `${longestOption}em`,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: palette.uiLight,
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: palette.transparent,
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: palette.uiDark,
    color: palette.uiLight,
    margin: 0,
    borderRadius: '0 0 5px 5px',
  }),
  menuList: (provided, state) => ({
    ...provided,
    backgroundColor: palette.uiDark,
    color: palette.uiLight,
    boxShadow: palette.cardShadow,
    borderRadius: '0 0 5px 5px',
  }),
  option: (provided, state) => {
    return {
      ...provided,
      backgroundColor: state.isFocused ? palette.uiDarker : palette.uiDark,
      color: palette.uiLight,
    };
  },
});
