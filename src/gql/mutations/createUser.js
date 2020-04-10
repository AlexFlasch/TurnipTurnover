import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export const mutation = gql`
  mutation createUser($uuid: String!, $displayName: String!) {
    insert_User(objects: { uuid: $uuid, displayName: $displayName }) {
      returning {
        uuid
        displayName
      }
    }
  }
`;

export default queryVars => useMutation(mutation, { variables: queryVars });
