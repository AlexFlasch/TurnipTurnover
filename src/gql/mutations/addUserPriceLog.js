import gql from 'graphql-tag';

export const mutation = gql`
  mutation addUserPriceLog(
    $userId: Int!
    $price: Int!
    $isBuyLog: Boolean
    $isSellLog: Boolean
    $datetime: timestamp
    $turnips: Int
  ) {
    insert_PriceLog(
      objects: {
        dateTime: $datetime
        isBuyLog: $isBuyLog
        isSellLog: $isSellLog
        price: $price
        turnips: $turnips
        userId: $userId
      }
    ) {
      affected_rows
    }
  }
`;
