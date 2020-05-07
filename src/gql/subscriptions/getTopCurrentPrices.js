import gql from 'graphql-tag';

export default gql`
  subscription getTopCurrentPriceLogs($since: timestamptz!) {
    PriceLog(
      order_by: { userId: asc, price: desc }
      limit: 100
      where: { dateTime: { _gte: $since } }
      distinct_on: userId
    ) {
      User {
        displayName
      }
      price
      dateTime
    }
  }
`;
