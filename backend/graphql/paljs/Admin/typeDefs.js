const { default: gql } = require('graphql-tag')

const Admin = gql`
  type Admin {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    surname: String!
    email: String!
    password: String!
    role: AdminRoleEnum!
  }

  type Query {
    findUniqueAdmin(where: AdminWhereUniqueInput!): Admin
    findFirstAdmin(
      where: AdminWhereInput
      orderBy: [AdminOrderByInput!]
      cursor: AdminWhereUniqueInput
      distinct: AdminScalarFieldEnum
      skip: Int
      take: Int
    ): Admin
    findManyAdmin(
      where: AdminWhereInput
      orderBy: [AdminOrderByInput!]
      cursor: AdminWhereUniqueInput
      distinct: AdminScalarFieldEnum
      skip: Int
      take: Int
    ): [Admin!]
    findManyAdminCount(
      where: AdminWhereInput
      orderBy: [AdminOrderByInput!]
      cursor: AdminWhereUniqueInput
      distinct: AdminScalarFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregateAdmin(
      where: AdminWhereInput
      orderBy: [AdminOrderByInput!]
      cursor: AdminWhereUniqueInput
      distinct: AdminScalarFieldEnum
      skip: Int
      take: Int
    ): AggregateAdmin
  }
  type Mutation {
    createOneAdmin(data: AdminCreateInput!): Admin!
    updateOneAdmin(
      where: AdminWhereUniqueInput!
      data: AdminUpdateInput!
    ): Admin!
    deleteOneAdmin(where: AdminWhereUniqueInput!): Admin
    upsertOneAdmin(
      where: AdminWhereUniqueInput!
      create: AdminCreateInput!
      update: AdminUpdateInput!
    ): Admin
    deleteManyAdmin(where: AdminWhereInput): BatchPayload
    updateManyAdmin(
      where: AdminWhereInput
      data: AdminUpdateManyMutationInput
    ): BatchPayload
  }
`

module.exports = {
  Admin,
}
