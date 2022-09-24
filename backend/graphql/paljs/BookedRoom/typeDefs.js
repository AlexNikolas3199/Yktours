const { default: gql } = require('graphql-tag')

const BookedRoom = gql`
  type BookedRoom {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    room: String!
    passengers(
      where: PassengersWhereInput
      orderBy: PassengersOrderByInput
      cursor: PassengersWhereUniqueInput
      take: Int
      skip: Int
      distinct: PassengersScalarFieldEnum
    ): [Passengers!]!
    arrived: Boolean!
    route: Route!
  }

  type Query {
    findUniqueBookedRoom(where: BookedRoomWhereUniqueInput!): BookedRoom
    findFirstBookedRoom(
      where: BookedRoomWhereInput
      orderBy: [BookedRoomOrderByInput!]
      cursor: BookedRoomWhereUniqueInput
      distinct: BookedRoomScalarFieldEnum
      skip: Int
      take: Int
    ): BookedRoom
    findManyBookedRoom(
      where: BookedRoomWhereInput
      orderBy: [BookedRoomOrderByInput!]
      cursor: BookedRoomWhereUniqueInput
      distinct: BookedRoomScalarFieldEnum
      skip: Int
      take: Int
    ): [BookedRoom!]
    findManyBookedRoomCount(
      where: BookedRoomWhereInput
      orderBy: [BookedRoomOrderByInput!]
      cursor: BookedRoomWhereUniqueInput
      distinct: BookedRoomScalarFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregateBookedRoom(
      where: BookedRoomWhereInput
      orderBy: [BookedRoomOrderByInput!]
      cursor: BookedRoomWhereUniqueInput
      distinct: BookedRoomScalarFieldEnum
      skip: Int
      take: Int
    ): AggregateBookedRoom
  }
  type Mutation {
    createOneBookedRoom(data: BookedRoomCreateInput!): BookedRoom!
    updateOneBookedRoom(
      where: BookedRoomWhereUniqueInput!
      data: BookedRoomUpdateInput!
    ): BookedRoom!
    deleteOneBookedRoom(where: BookedRoomWhereUniqueInput!): BookedRoom
    upsertOneBookedRoom(
      where: BookedRoomWhereUniqueInput!
      create: BookedRoomCreateInput!
      update: BookedRoomUpdateInput!
    ): BookedRoom
    deleteManyBookedRoom(where: BookedRoomWhereInput): BatchPayload
    updateManyBookedRoom(
      where: BookedRoomWhereInput
      data: BookedRoomUpdateManyMutationInput
    ): BatchPayload
  }
`

module.exports = {
  BookedRoom,
}
