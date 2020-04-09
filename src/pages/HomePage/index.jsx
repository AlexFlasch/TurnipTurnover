import React from 'react';
import DataGrid from 'react-data-grid';

const HomePage = props => {
  const columns = [];
  const rows = [];

  return (
    <>
      <DataGrid columns={columns} rows={rows} />
    </>
  );
};

export default HomePage;
