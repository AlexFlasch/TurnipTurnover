import gql from 'graphql-tag';

export default gql`
  query hasCurrentPriceLog($userId: Int!, $cutoffTime: timestamptz!) {
    PriceLog(
      where: {
        User: { id: { _eq: $userId } }
        _and: { dateTime: { _gt: $cutoffTime } }
      }
    ) {
      id
    }
  }
`;
