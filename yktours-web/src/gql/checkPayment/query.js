import { gql } from '@apollo/client'

export const FIND_STATUS_PURCHASE = gql`
  query ($where: StatusCheckUniqueInput!) {
    findStatusPurchase(where: $where)
  }
`
export const FIND_MANY_PURCHASE = gql`
  query ($where: PurchaseWhereInput) {
    findManyPurchase(where: $where) {
      id
      ticketInfo
      amount
    }
  }
`
