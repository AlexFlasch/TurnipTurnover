import gql from 'graphql-tag';

export default gql`
  mutation addUser($uuid: String!, $displayName: String!) {
    insert_User(objects: { uuid: $uuid, displayName: $displayName }) {
      returning {
        id
        uuid
        displayName
      }
    }
  }
`;
