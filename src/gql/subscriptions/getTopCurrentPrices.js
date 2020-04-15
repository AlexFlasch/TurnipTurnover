import gql from 'graphql-tag';

export const subscription = gql`
  subscription getTopCurrentPriceLogs($since: timestamptz!) {
    PriceLog(
      order_by: { price: desc }
      limit: 100
      where: { dateTime: { _gte: $since } }
    ) {
      User {
        displayName
      }
      price
      dateTime
    }
  }
`;
