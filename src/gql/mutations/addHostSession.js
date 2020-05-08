import gql from 'graphql-tag';

export default gql`
  mutation addHostSession(
    $dodoCode: String!
    $isBuySession: Boolean!
    $isSellSession: Boolean!
    $isPublic: Boolean!
    $maxVisitors: Int!
    $queueSize: Int!
    $urlCode: String!
    $hostId: Int!
    $createdAt: timestamptz!
  ) {
    insert_Session(
      objects: {
        dodoCode: $dodoCode
        isBuySession: $isBuySession
        isSellSession: $isSellSession
        isPublic: $isPublic
        maxVisitors: $maxVisitors
        queueSize: $queueSize
        urlCode: $urlCode
        hostId: $hostId
        createdAt: $createdAt
      }
    ) {
      returning {
        urlCode
      }
    }
    update_User(where: { id: { _eq: $hostId } }, _set: { isHosting: true }) {
      returning {
        isHosting
      }
    }
  }
`;
