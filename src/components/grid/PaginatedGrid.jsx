import React from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination } from 'react-table';

import StyledTable from './styles/StyledTable';

import GridPaginator from './components/GridPaginator.jsx/GridPaginator';

const PaginatedGrid = props => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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
  } = useTable({
    columns: props.columns,
    data: props.data,
  }, usePagination);

  setPageSize(props.pageSize);

  return (
    <StyledTable {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps(i)}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </StyledTable>
    <GridPaginator
      pageCount={pageCount}
      canPreviousPage={canPreviousPage}
      canNextPage={canNextPage}
      previousPage={previousPage}
      nextPage={nextPage}
      pageOptions={pageOptions}
      gotoPage={gotoPage}
    />
  )
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