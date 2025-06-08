import { gql } from 'apollo-angular';

export const Login = gql`
  mutation Token($username: String!, $password: String!) {
    token(username: $username, password: $password) {
      acces_token
      refresh_token
      expires_in
    }
  }
`;
