import styled from 'styled-components';

import palette from '../../../theme-palette';

export default styled.table`
  width: 100%;
  color: ${palette.uiLight};
  background-color: ${palette.uiDarker};
  border-collapse: collapse;
  border-radius: ${props => (props.paginated ? '5px 5px 0 0' : '5px')};
  box-shadow: ${props => (props.paginated ? 'none' : palette.cardShadow)};

  padding: 10px;

  thead tr {
    border-bottom: 3px solid ${palette.accentMint};
  }

  th {
    text-align: left;
    padding: 10px;
  }

  tbody tr:nth-child(even) {
    background-color: ${palette.uiDark};
  }

  /* add bottom border radii to the last row's first and last td */
  tbody tr:last-of-type {
    td:first-of-type {
      border-bottom-left-radius: ${props => (props.paginated ? '0px' : '5px')};
    }

    td:last-of-type {
      border-bottom-right-radius: ${props => (props.paginated ? '0px' : '5px')};
    }
  }

  td:not(:last-of-type) {
    text-align: left;
    padding: 10px;
  }
`;
