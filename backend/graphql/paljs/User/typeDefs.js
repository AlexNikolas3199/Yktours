const { default: gql } = require('graphql-tag')

const User = gql`
  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    tel: String
    email: String
    emailVerification: Boolean!
    role: RoleEnum!
    isVerified: Boolean!
    tickets(
      where: TicketWhereInput
      orderBy: TicketOrderByInput
      cursor: TicketWhereUniqueInput
      take: Int
      skip: Int
      distinct: TicketScalarFieldEnum
    ): [Ticket!]!
  }

  type Query {
    findUniqueUser(where: UserWhereUniqueInput!): User
    findFirstUser(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      distinct: UserScalarFieldEnum
      skip: Int
      take: Int
    ): User
    findManyUser(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      distinct: UserScalarFieldEnum
      skip: Int
      take: Int
    ): [User!]
    findManyUserCount(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      distinct: UserScalarFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregateUser(
      where: UserWhereInput
      orderBy: [UserOrderByInput!]
      cursor: UserWhereUniqueInput
      distinct: UserScalarFieldEnum
      skip: Int
      take: Int
    ): AggregateUser
  }
  type Mutation {
    createOneUser(data: UserCreateInput!): User!
    updateOneUser(where: UserWhereUniqueInput!, data: UserUpdateInput!): User!
    deleteOneUser(where: UserWhereUniqueInput!): User
    upsertOneUser(
      where: UserWhereUniqueInput!
      create: UserCreateInput!
      update: UserUpdateInput!
    ): User
    deleteManyUser(where: UserWhereInput): BatchPayload
    updateManyUser(
      where: UserWhereInput
      data: UserUpdateManyMutationInput
    ): BatchPayload
  }
`

module.exports = {
  User,
}
