import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import parseISO from 'date-fns/parseISO';

import { mdy12hDatetimeFormat } from '../../utils/i18n-formats';

import AuthContext from '../../contexts/auth';

import { query } from '../../gql/queries/getPriceLogsForUser';

import Grid from '../../components/grid/Grid';
import PriceLogForm from './components/PriceLogForm';

import StyledTrackPageWrapper from './styles/StyledTrackPageWrapper';

const TrackPage = props => {
  const {
    user: { id: userId },
  } = useContext(AuthContext);

  const { data, loading } = useQuery(query, { variables: { userId } });

  const [submittedRows, setSubmittedRows] = useState([]);

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

  const createPriceLogRow = log => {
    let buySell;
    let profit;
    if (log.isBuyLog) {
      buySell = BUY_LOG;
      profit = -1 * log.price * log.turnips;
    } else if (log.isSellLog) {
      buySell = SELL_LOG;
      profit = log.price * log.turnips;
    } else {
      buySell = PRICE_LOG;
      profit = '';
    }

    return {
      buySell,
      price: log.price,
      turnips: log.turnips,
      datetime: mdy12hDatetimeFormat(parseISO(log.dateTime)),
      profit,
    };
  };

  const createRowsFromQuery = () => {
    if (!loading && data?.User?.[0]?.PriceLogs) {
      return data.User[0].PriceLogs.map(log => createPriceLogRow(log));
    } else return [];
  };

  const addSubmittedLog = newLog => {
    setSubmittedRows([...submittedRows, createPriceLogRow(newLog)]);
  };

  const combinedRows = [...createRowsFromQuery(), ...submittedRows];
  console.log('combined rows: ', combinedRows);

  return (
    <StyledTrackPageWrapper>
      <Grid columns={columns} data={combinedRows} />
      <PriceLogForm handleSubmit={addSubmittedLog} />
    </StyledTrackPageWrapper>
  );
};

export default TrackPage;
