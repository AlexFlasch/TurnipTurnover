import gql from 'graphql-tag';

export const query = gql`
  query getPriceLogsForUser($id: Int!) {
    User(where: { id: { _eq: $id } }, limit: 1) {
      priceLogs {
        isBuyLog
        isSellLog
        price
        dateTime
        turnips
      }
    }
  }
`;
