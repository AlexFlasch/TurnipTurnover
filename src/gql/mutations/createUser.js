import gql from 'graphql-tag';

export default gql`
  mutation createUser($uuid: String!, $displayName: String!) {
    insert_Users(objects: { uuid: $uuid, displayName: $displayName }) {
      returning {
        uuid
      }
    }
  }
`;
