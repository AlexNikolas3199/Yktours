import { gql } from '@apollo/client'
export const UPDATE_USER = gql`
  mutation ($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateOneUser(where: $where, data: $data) {
      id
    }
  }
`
