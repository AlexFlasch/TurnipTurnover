import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../../contexts/auth';

import Grid from '../../components/grid/Grid';
import Input from '../../components/input/Input';

import StyledTrackPageWrapper from './styles/StyledTrackPageWrapper';

const TrackPage = props => {
  const { user } = useContext(AuthContext);

  const BUY_LOG = 'Buy';
  const SELL_LOG = 'Sell';
  const PRICE_LOG = 'Price Check';

  const columns = [
    { header: 'Buy / Sell', accessor: 'buySell' },
    { header: 'Price', accessor: 'price' },
    { header: 'Turnips Bought / Sold', accessor: 'turnips' },
    { header: 'Date', accessor: 'datetime' },
    { header: 'Profit', accessor: 'profit' },
  ];

  const rows = [
    {
      buySell: BUY_LOG,
      price: 104,
      turnips: 2710,
      datetime: new Date().toString(),
      profit: (-1 * 104 * 2710).toLocaleString(),
    },
    {
      buySell: PRICE_LOG,
      price: 78,
      turnips: 0,
      datetime: new Date().toString(),
      profit: 0,
    },
    {
      buySell: PRICE_LOG,
      price: 97,
      turnips: 0,
      datetime: new Date().toString(),
      profit: 0,
    },
    {
      buySell: SELL_LOG,
      price: 156,
      turnips: 2710,
      datetime: new Date().toString(),
      profit: (156 * 2710).toLocaleString(),
    },
  ];

  return (
    <StyledTrackPageWrapper>
      {console.log('current user: ', user)}
      <Grid columns={columns} data={rows} />
      <Input label="Turnip Price" />
    </StyledTrackPageWrapper>
  );
};

export default TrackPage;
