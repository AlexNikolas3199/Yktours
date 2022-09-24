const { default: gql } = require('graphql-tag')

const Passengers = gql`
  type Passengers {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    food: String
    name: String!
    surname: String!
    patronymic: String!
    dateOfBirth: DateTime!
    documentType: String!
    documentNumber: String!
    arrived: Boolean!
    ticket: Ticket
    ticketId: String
    bookedRoom: BookedRoom
    bookedId: String
  }

  type Query {
    findUniquePassengers(where: PassengersWhereUniqueInput!): Passengers
    findFirstPassengers(
      where: PassengersWhereInput
      orderBy: [PassengersOrderByInput!]
      cursor: PassengersWhereUniqueInput
      distinct: PassengersScalarFieldEnum
      skip: Int
      take: Int
    ): Passengers
    findManyPassengers(
      where: PassengersWhereInput
      orderBy: [PassengersOrderByInput!]
      cursor: PassengersWhereUniqueInput
      distinct: PassengersScalarFieldEnum
      skip: Int
      take: Int
    ): [Passengers!]
    findManyPassengersCount(
      where: PassengersWhereInput
      orderBy: [PassengersOrderByInput!]
      cursor: PassengersWhereUniqueInput
      distinct: PassengersScalarFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregatePassengers(
      where: PassengersWhereInput
      orderBy: [PassengersOrderByInput!]
      cursor: PassengersWhereUniqueInput
      distinct: PassengersScalarFieldEnum
      skip: Int
      take: Int
    ): AggregatePassengers
  }
  type Mutation {
    createOnePassengers(data: PassengersCreateInput!): Passengers!
    updateOnePassengers(
      where: PassengersWhereUniqueInput!
      data: PassengersUpdateInput!
    ): Passengers!
    deleteOnePassengers(where: PassengersWhereUniqueInput!): Passengers
    upsertOnePassengers(
      where: PassengersWhereUniqueInput!
      create: PassengersCreateInput!
      update: PassengersUpdateInput!
    ): Passengers
    deleteManyPassengers(where: PassengersWhereInput): BatchPayload
    updateManyPassengers(
      where: PassengersWhereInput
      data: PassengersUpdateManyMutationInput
    ): BatchPayload
  }
`

module.exports = {
  Passengers,
}
