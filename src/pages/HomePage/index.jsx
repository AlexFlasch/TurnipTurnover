import React from 'react';
import DataGrid from 'react-data-grid';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

const HomePage = props => {
  const columns = [];
  const rows = [];

  return (
    <>
      <DataGrid columns={columns} rows={rows}></DataGrid>
    </>
  );
};

export default HomePage;
