import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import parseISO from 'date-fns/parseISO';

import { mdy12hDatetimeFormat } from '../../utils/i18n-formats';

import AuthContext from '../../contexts/auth';

import getPriceLogsForUser from '../../gql/queries/getPriceLogsForUser';

import PageWrapper from '../../components/page-wrapper/PageWrapper';
import Card from '../../components/card/Card';
import PaginatedGrid from '../../components/grid/PaginatedGrid';
import PriceLogForm from './components/PriceLogForm';

const TrackPage = props => {
  const { user } = useContext(AuthContext);
  const userId = user?.id;

  const { data, loading } = useQuery(getPriceLogsForUser, {
    variables: { userId },
  });

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

  return (
    <PageWrapper>
      <Card noPadding={true}>
        <h1 className="card-title">Your Price Logs</h1>
        <PaginatedGrid columns={columns} data={combinedRows} />
      </Card>
      <Card>
        <PriceLogForm handleSubmit={addSubmittedLog} />
      </Card>
    </PageWrapper>
  );
};

export default TrackPage;
