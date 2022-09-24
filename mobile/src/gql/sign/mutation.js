import {gql} from '@apollo/client';

export const SIGN_IN = gql`
  mutation ($data: AuthInput!) {
    signIn(data: $data) {
      token
    }
  }
`;

export const SIGN_IN_VERIFY = gql`
  mutation ($token: String!, $code: String!) {
    signInVerify(token: $token, code: $code) {
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation ($data: AuthInput!) {
    signUp(data: $data)
  }
`;

export const SIGN_UP_VERIFY = gql`
  mutation ($token: String!, $code: String!) {
    signUpVerify(token: $token, code: $code) {
      token
    }
  }
`;
export const UPDATE_ONE_USER = gql`
  mutation ($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateOneUser(where: $where, data: $data) {
      id
      email
    }
  }
`;
export const SEND_EMAIL_VERIFY = gql`
  mutation ($data: EmailVerifyInput!) {
    emailVerify(data: $data)
  }
`;
export const PHONE_UPDATE = gql`
  mutation ($data: PhoneUpdateInput!) {
    phoneUpdate(data: $data){
        token
    }
  }
`;
export const PHONE_UPDATE_VERIFY = gql`
  mutation ($token: String!, $code: String!) {
    phoneUpdateVerify(token: $token, code: $code)
  }
`;
