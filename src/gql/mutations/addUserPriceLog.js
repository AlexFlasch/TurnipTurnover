import gql from 'graphql-tag';

export default gql`
  mutation addUserPriceLog(
    $userId: Int!
    $price: Int!
    $isBuyLog: Boolean
    $isSellLog: Boolean
    $dateTime: timestamptz
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
