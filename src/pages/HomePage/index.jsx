import React, { useState } from 'react';
import { useSubscription } from '@apollo/react-hooks';
import parseISO from 'date-fns/parseISO';

import { mdy12hTzDatetimeFormat } from '../../utils/i18n-formats';
import { getCutoffTime } from '../../utils/time-fns';

import getTopCurrentPrices from '../../gql/subscriptions/getTopCurrentPrices';

import PageWrapper from '../../components/page-wrapper/PageWrapper';
import Card from '../../components/card/Card';
import PaginatedGrid from '../../components/grid/PaginatedGrid';

const HomePage = props => {
  const [rows, setRows] = useState([]);
  const createRowsFromSubscription = ({ subscriptionData: { data } }) => {
    if (data?.PriceLog) {
      setRows(
        data?.PriceLog?.map(log => ({
          user: log.User.displayName,
          price: log.price,
          datetime: mdy12hTzDatetimeFormat(parseISO(log.dateTime)),
        })),
      );
    }
  };

  const { loading } = useSubscription(getTopCurrentPrices, {
    variables: { since: getCutoffTime() },
    onSubscriptionData: createRowsFromSubscription,
  });

  const columns = [
    { header: 'User', accessor: 'user' },
    { header: 'Current Price', accessor: 'price' },
    { header: 'Time of Log', accessor: 'datetime' },
  ];

  return (
    <PageWrapper>
      <Card noHorizontalPadding={true}>
        <h1 className="card-title">Current Top Prices</h1>
        <PaginatedGrid
          columns={columns}
          data={rows}
          noContentText={loading ? 'Getting top prices...' : undefined}
        />
      </Card>
    </PageWrapper>
  );
};

export default HomePage;
