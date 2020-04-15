import React, { useState, useEffect } from 'react';
import { useSubscription } from '@apollo/react-hooks';
import setHours from 'date-fns/setHours';
import getHours from 'date-fns/getHours';
import setMinutes from 'date-fns/setMinutes';
import formatISO from 'date-fns/formatISO';
import parseISO from 'date-fns/parseISO';

import { mdy12hTzDatetimeFormat } from '../../utils/i18n-formats';

import { subscription } from '../../gql/subscriptions/getTopCurrentPrices';

import PaginatedGrid from '../../components/grid/PaginatedGrid';

const HomePage = props => {
  const getSinceComparisonTimestamp = () => {
    const currentTime = new Date();
    const currentHours = getHours(currentTime);

    const roundMinutesDown = datetime => setMinutes(datetime, 0);

    let comparisonTimestamp;
    if (currentHours < 12) {
      const setToMorningBeginningHours = datetime =>
        setHours(datetime, currentHours - 6);

      comparisonTimestamp = setToMorningBeginningHours(currentTime);
      comparisonTimestamp = roundMinutesDown(comparisonTimestamp);
    } else {
      const setToAfternoonBeginningHours = datetime =>
        setHours(datetime, currentHours - 12);

      comparisonTimestamp = setToAfternoonBeginningHours(currentTime);
      comparisonTimestamp = roundMinutesDown(comparisonTimestamp);
    }

    return comparisonTimestamp;
  };

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

  const { data, loading } = useSubscription(subscription, {
    variables: { since: getSinceComparisonTimestamp() },
    onSubscriptionData: createRowsFromSubscription,
  });

  const columns = [
    { header: 'User', accessor: 'user' },
    { header: 'Current Price', accessor: 'price' },
    { header: 'Time of Log', accessor: 'datetime' },
  ];

  return <PaginatedGrid columns={columns} data={rows} />;
};

export default HomePage;
