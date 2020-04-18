import gql from 'graphql-tag';

export default gql`
  query displayNameExists($displayName: String!) {
    User(where: { displayName: { _eq: $displayName } }) {
      displayName
    }
  }
`;
