import gql from 'graphql-tag';

export const mutation = gql`
  mutation addUser($uuid: String!, $displayName: String!) {
    insert_User(objects: { uuid: $uuid, displayName: $displayName }) {
      returning {
        uuid
        displayName
      }
    }
  }
`;
