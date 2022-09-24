import { gql } from '@apollo/client'

export const FIND_ME_ADMIN = gql`
  query {
    meAdmin {
      id
      name
      surname
      email
      role
    }
  }
`
export const FIND_MANY_ADMIN = gql`
  query ($where: AdminWhereInput) {
    findManyAdmin(where: $where) {
      id
      email
      name
      surname
      role
    }
  }
`

export const SIGN_IN_ADMIN = gql`
  mutation ($data: AuthAdminInput!) {
    signInAdmin(data: $data) {
      token
    }
  }
`

export const UPDATE_PASSWORD_ADMIN = gql`
  mutation ($data: UpdatePasswordAdminInput!) {
    updatePasswordAdmin(data: $data) {
      id
      createdAt
      email
    }
  }
`
export const CREATE_ONE_ADMIN = gql`
  mutation ($data: AdminCreateInput!) {
    createOneAdmin(data: $data) {
      id
    }
  }
`
export const UPDATE_ONE_ADMIN = gql`
  mutation ($data: AdminUpdateInput!, $where: AdminWhereUniqueInput!) {
    updateOneAdmin(data: $data, where: $where) {
      id
    }
  }
`
export const DELETE_ONE_ADMIN = gql`
  mutation ($where: AdminWhereUniqueInput!) {
    deleteOneAdmin(where: $where) {
      id
    }
  }
`
