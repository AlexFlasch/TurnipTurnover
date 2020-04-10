import gql from 'graphql-tag';

export default gql`
  query getUserData($uuid: String) {
    User(distinct_on: uuid, where: { uuid: { _eq: $uuid } }) {
      id
      uuid
      displayName
    }
  }
`;
