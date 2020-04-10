import gql from 'graphql-tag';

export const query = gql`
  query getUserPriceLogs($id: Int!) {
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
