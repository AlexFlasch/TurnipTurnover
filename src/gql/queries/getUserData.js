import gql from 'graphql-tag';

export default gql`
  query getUserData($uuid: String) {
    User(where: { uuid: { _eq: $uuid } }) {
      id
      uuid
      displayName
      isHosting
      rep
    }
  }
`;
