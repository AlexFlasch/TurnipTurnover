import styled from 'styled-components';

import palette from '../../../theme-palette';

export default styled.div`
  .react-datepicker {
    display: flex;
    background-color: ${palette.uiDark};
    color: ${palette.uiLight};
    border: 0;
    box-shadow: ${palette.cardShadow};
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker-time__header {
    color: inherit;
  }

  .react-datepicker__day--disabled {
    opacity: 0.5;
  }

  /* styles for the prev/next month buttons */
  .react-datepicker__navigation--previous {
    border-right-color: ${palette.uiLight};
  }

  .react-datepicker__navigation--next {
    border-left-color: ${palette.uiLight};
  }

  /* ugh. more crappy specificity. nudge the poorly placed month navigations to account for the changed container width */
  .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
    right: 95px;
  }

  .react-datepicker__header {
    background-color: ${palette.uiDark};
    color: ${palette.uiLight};
    border: 0;
    border-bottom: 3px solid ${palette.accentMint};
  }

  .react-datepicker__month-container {
    width: 240px;
    float: unset;
  }

  /* selected color for day */
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: ${palette.uiLight};
    color: ${palette.uiDark};
  }

  .react-datepicker__time-container {
    width: 90px;
    border-left: 1px solid ${palette.bg};
    background-color: ${palette.uiDark};
    float: unset;
  }

  .react-datepicker__time {
    background: none;
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box {
    width: 100%;
    margin: 0;
  }

  .react-datepicker__time-list {
    background-color: ${palette.uiDark};
    color: ${palette.uiLight};
    border: 0;
  }

  .react-datepicker__day:hover {
    background-color: ${palette.bg};
    color: ${palette.uiLight};
  }

  /* come on react-datepicker, why so much specificity? */
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item:hover {
    background-color: ${palette.bg};
    color: ${palette.uiLight};
  }
`;
