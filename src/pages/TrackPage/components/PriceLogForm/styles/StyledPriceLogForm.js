import styled from 'styled-components';

import palette from '../../../../../theme-palette';

export default styled.form`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: minmax(100px, auto);
  grid-gap: 15px;
  align-items: center;

  .log-type {
    grid-column: span 2;
  }

  .turnip-amount {
    grid-column: span 2;
  }

  .turnip-input-mode {
    grid-column: span 2;
  }

  .turnip-price {
    grid-column: span 3;
  }

  .log-datetime {
    grid-column: span 3;

    .react-datepicker-wrapper {
      width: 100%;
    }
  }

  .submit-btn {
    grid-column: 3 / span 2;
  }

  ${palette.mobile} {
    & {
      display: flex;
      flex-direction: column;

      align-items: stretch;
    }
  }
`;
