import palette from '../../../theme-palette';

export default {
  container: (provided, state) => ({
    ...provided,
    margin: '10px 0',
    height: palette.scale(2),
    fontSize: palette.scale(1),
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
      height: '100%',
      backgroundColor: palette.uiDark,
      color: palette.uiLight,
      borderRadius: '5px 5px 0 0',
      border: 0,
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
    backgroundColor: palette.uiDark,
    color: palette.uiLight,
    height: '100%',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    paddingLeft: 0,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: palette.uiLight,
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    alignSelf: 'center',
    backgroundColor: palette.uiDarker,
    height: '80%',
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
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? palette.uiDarker : palette.uiDark,
    color: palette.uiLight,
  }),
};
