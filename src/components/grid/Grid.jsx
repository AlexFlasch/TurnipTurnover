import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';

import StyledTable from './styles/StyledTable';

const Grid = props => {
  const columns = useMemo(() => [...props.columns]);
  const data = useMemo(() => [...props.data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <StyledTable {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(header => (
              <th {...header.getHeaderProps()}>{header.render('header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

Grid.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      accessor: PropTypes.string,
    }),
  ).isRequired,
  data: PropTypes.array,
};

Grid.defaultProps = {
  data: [],
};

export default Grid;
