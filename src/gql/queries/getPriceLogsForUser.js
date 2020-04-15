import gql from 'graphql-tag';

export const query = gql`
  query getPriceLogsForUser($userId: Int!) {
    User(where: { id: { _eq: $userId } }, limit: 1) {
      PriceLogs {
        isBuyLog
        isSellLog
        price
        dateTime
        turnips
      }
    }
  }
`;
