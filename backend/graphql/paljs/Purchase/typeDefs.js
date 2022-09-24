const { default: gql } = require('graphql-tag')

const Purchase = gql`
  type Purchase {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    orderNumber: String
    orderId: String
    amount: String
    url: String
    ticketInfo: Json
  }

  input StatusCheckUniqueInput {
        id: String
        orderId: String!
    }

  input RefundInput {
      orderId: String
      amount: Int
  }

  type Query {
    findStatusPurchase(where: StatusCheckUniqueInput!): Json
    findUniquePurchase(where: PurchaseWhereUniqueInput!): Purchase
    findFirstPurchase(
      where: PurchaseWhereInput
      orderBy: [PurchaseOrderByInput!]
      cursor: PurchaseWhereUniqueInput
      distinct: PurchaseScalarFieldEnum
      skip: Int
      take: Int
    ): Purchase
    findManyPurchase(
      where: PurchaseWhereInput
      orderBy: [PurchaseOrderByInput!]
      cursor: PurchaseWhereUniqueInput
      distinct: PurchaseScalarFieldEnum
      skip: Int
      take: Int
    ): [Purchase!]
    findManyPurchaseCount(
      where: PurchaseWhereInput
      orderBy: [PurchaseOrderByInput!]
      cursor: PurchaseWhereUniqueInput
      distinct: PurchaseScalarFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregatePurchase(
      where: PurchaseWhereInput
      orderBy: [PurchaseOrderByInput!]
      cursor: PurchaseWhereUniqueInput
      distinct: PurchaseScalarFieldEnum
      skip: Int
      take: Int
    ): AggregatePurchase
  }
  type Mutation {
    refundInput(data: RefundInput!) : Json
    createOnePurchase(data: PurchaseCreateInput!): Purchase!
    updateOnePurchase(
      where: PurchaseWhereUniqueInput!
      data: PurchaseUpdateInput!
    ): Purchase!
    deleteOnePurchase(where: PurchaseWhereUniqueInput!): Purchase
  }
`

module.exports = {
  Purchase,
}
