import { gql } from '@apollo/client'

export const FIND_MANY_ROUTE = gql`
  query ($where: RouteWhereInput) {
    findManyRoute(where: $where) {
      id
      image
      food
      foodKids
      Pricing
      duration
      date
      createdAt
      Desc
      DescEng
      route
      routeEng
      ship
      ticket {
        id
        room
        passengers {
          id
          name
          surname
          patronymic
          dateOfBirth
          documentType
          documentNumber
          food
          arrived
        }
      }
      bookedRoom {
        id
        room
        passengers {
          id
          name
          surname
          patronymic
          dateOfBirth
          documentType
          documentNumber
          food
          arrived
        }
      }
    }
  }
`

export const CREATE_ONE_ROUTE = gql`
  mutation ($data: RouteCreateInput!) {
    createOneRoute(data: $data) {
      id
    }
  }
`
export const UPDATE_ONE_ROUTE = gql`
  mutation ($data: RouteUpdateInput!, $where: RouteWhereUniqueInput!) {
    updateOneRoute(data: $data, where: $where) {
      id
    }
  }
`
export const DELETE_ONE_ROUTE = gql`
  mutation ($where: RouteWhereUniqueInput!) {
    deleteOneRoute(where: $where) {
      id
    }
  }
`
