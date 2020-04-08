import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const query = gql`
  query displayNameExists($displayName: String!) {
    Users(where: { displayName: { _eq: $displayName } }) {
      displayName
    }
  }
`;

export default queryVars => useQuery(query, queryVars);
