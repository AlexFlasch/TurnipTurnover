import gql from 'graphql-tag';

export const mutation = gql`
  mutation addUserPriceLog(
    $userId: Int!
    $price: Int!
    $isBuyLog: Boolean
    $isSellLog: Boolean
    $dateTime: time
    $turnips: Int
  ) {
    insert_PriceLog(
      objects: {
        dateTime: $dateTime
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
