import React from 'react';

import StyledGridPaginator from './styles/StyledGridPaginator';

import PaginationButton from '../pagination-button/PaginationButton';
import PaginationDropdown from '../pagination-dropdown/PaginationDropdown';

const GridPaginator = props => {
  const dropdownValues = Array(props.pageCount)
    .fill()
    .map((_, i) => ({ label: i + 1, value: i }));

  const longestOptionDigits = Math.ceil(props.pageCount + 1 / 10);

  return (
    <StyledGridPaginator>
      <PaginationButton
        handleClick={() => props.gotoPage(0)}
        disabled={props.currentPage === 0}
      >
        <span className="lnr lnr-chevron-left" />
        <span className="lnr lnr-chevron-left" />
      </PaginationButton>
      <PaginationButton
        handleClick={props.previousPage}
        disabled={props.currentPage === 0}
      >
        <span className="lnr lnr-chevron-left" />
      </PaginationButton>
      <div className="page-select">
        <p>Page:</p>
        <PaginationDropdown
          handleChange={option => props.gotoPage(option.value)}
          options={dropdownValues}
          longestOptionWidth={longestOptionDigits}
        />
      </div>
      <PaginationButton
        handleClick={props.nextPage}
        disabled={props.currentPage === props.pageCount - 1}
      >
        <span className="lnr lnr-chevron-right" />
      </PaginationButton>
      <PaginationButton
        handleClick={() => props.gotoPage(props.pageCount - 1)}
        disabled={props.currentPage === props.pageCount - 1}
      >
        <span className="lnr lnr-chevron-right" />
        <span className="lnr lnr-chevron-right" />
      </PaginationButton>
    </StyledGridPaginator>
  );
};

GridPaginator.propTypes = {};

GridPaginator.defaultProps = {};

export default GridPaginator;
