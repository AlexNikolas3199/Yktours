const { default: gql } = require('graphql-tag')

const Ticket = gql`
  type Ticket {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    postId: String!
    room: String!
    food: [Json!]!
    foodEng: [Json!]!
    passengers(
      where: PassengersWhereInput
      orderBy: PassengersOrderByInput
      cursor: PassengersWhereUniqueInput
      take: Int
      skip: Int
      distinct: PassengersScalarFieldEnum
    ): [Passengers!]!
    orderId: String!
    amount: Int!
    route: Route!
    userId: String!
    user: User!
  }

  input FindUniqueTicketByOrderIdInput {
    orderId: String!
  }

  type Query {
    findUniqueTicketByOrderId(where: FindUniqueTicketByOrderIdInput ) : Ticket
    findUniqueTicket(where: TicketWhereUniqueInput!): Ticket
    findFirstTicket(
      where: TicketWhereInput
      orderBy: [TicketOrderByInput!]
      cursor: TicketWhereUniqueInput
      distinct: TicketScalarFieldEnum
      skip: Int
      take: Int
    ): Ticket
    findManyTicket(
      where: TicketWhereInput
      orderBy: [TicketOrderByInput!]
      cursor: TicketWhereUniqueInput
      distinct: TicketScalarFieldEnum
      skip: Int
      take: Int
    ): [Ticket!]
    findManyTicketCount(
      where: TicketWhereInput
      orderBy: [TicketOrderByInput!]
      cursor: TicketWhereUniqueInput
      distinct: TicketScalarFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregateTicket(
      where: TicketWhereInput
      orderBy: [TicketOrderByInput!]
      cursor: TicketWhereUniqueInput
      distinct: TicketScalarFieldEnum
      skip: Int
      take: Int
    ): AggregateTicket
  }
  type Mutation {
    createOneTicket(data: TicketCreateInput!): Ticket!
    updateOneTicket(
      where: TicketWhereUniqueInput!
      data: TicketUpdateInput!
    ): Ticket!
    deleteOneTicket(where: TicketWhereUniqueInput!): Ticket
    upsertOneTicket(
      where: TicketWhereUniqueInput!
      create: TicketCreateInput!
      update: TicketUpdateInput!
    ): Ticket
    deleteManyTicket(where: TicketWhereInput): BatchPayload
    updateManyTicket(
      where: TicketWhereInput
      data: TicketUpdateManyMutationInput
    ): BatchPayload
  }
`

module.exports = {
  Ticket,
}
