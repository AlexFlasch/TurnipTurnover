import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination } from 'react-table';

import StyledTable from './styles/StyledTable';
import StyledPaginatedGrid from './styles/StyledPaginatedGrid';

import GridPaginator from './components/grid-paginator/GridPaginator';

const PaginatedGrid = props => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex },
  } = useTable(
    {
      columns: props.columns,
      data: props.data,
    },
    usePagination,
  );

  useEffect(() => {
    setPageSize(props.pageSize);
  }, [setPageSize, props.pageSize]);

  const createHeaders = () => {
    return headerGroups.map(headerGroup => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map(header => (
          <th {...header.getHeaderProps()}>{header.render('header')}</th>
        ))}
      </tr>
    ));
  };

  const createRows = () => {
    return page.map((row, i) => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()}>
          {row.cells.map(cell => {
            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
          })}
        </tr>
      );
    });
  };

  const createGrid = () => {
    return (
      <>
        <StyledTable {...getTableProps()} paginated={true}>
          <thead>{createHeaders()}</thead>
          <tbody {...getTableBodyProps()}>{createRows()}</tbody>
        </StyledTable>
        <GridPaginator
          currentPage={pageIndex}
          pageCount={pageCount}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          previousPage={previousPage}
          nextPage={nextPage}
          pageOptions={pageOptions}
          gotoPage={gotoPage}
        />
      </>
    );
  };

  const createEmptyDisplay = () => {
    return <p className="empty-display">Nothing to display!</p>;
  };

  return (
    <StyledPaginatedGrid>
      {rows.length === 0 ? createEmptyDisplay() : createGrid()}
    </StyledPaginatedGrid>
  );
};

PaginatedGrid.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSize: PropTypes.number,
};

PaginatedGrid.defaultProps = {
  pageSize: 15,
};

export default PaginatedGrid;
