const { default: gql } = require('graphql-tag')

const Route = gql`
  type Route {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    date: DateTime!
    image: String!
    food: [Int!]!
    foodKids: [Int]
    Pricing: [Int!]!
    duration: Int!
    Desc: String!
    DescEng: String!
    route: [String!]!
    routeEng: [String!]!
    ship: Int!
    ticket(
      where: TicketWhereInput
      orderBy: TicketOrderByInput
      cursor: TicketWhereUniqueInput
      take: Int
      skip: Int
      distinct: TicketScalarFieldEnum
    ): [Ticket!]!
    bookedRoom(
      where: BookedRoomWhereInput
      orderBy: BookedRoomOrderByInput
      cursor: BookedRoomWhereUniqueInput
      take: Int
      skip: Int
      distinct: BookedRoomScalarFieldEnum
    ): [BookedRoom!]!
  }

  type Query {
    findUniqueRoute(where: RouteWhereUniqueInput!): Route
    findFirstRoute(
      where: RouteWhereInput
      orderBy: [RouteOrderByInput!]
      cursor: RouteWhereUniqueInput
      distinct: RouteScalarFieldEnum
      skip: Int
      take: Int
    ): Route
    findManyRoute(
      where: RouteWhereInput
      orderBy: [RouteOrderByInput!]
      cursor: RouteWhereUniqueInput
      distinct: RouteScalarFieldEnum
      skip: Int
      take: Int
    ): [Route!]
    findManyRouteCount(
      where: RouteWhereInput
      orderBy: [RouteOrderByInput!]
      cursor: RouteWhereUniqueInput
      distinct: RouteScalarFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregateRoute(
      where: RouteWhereInput
      orderBy: [RouteOrderByInput!]
      cursor: RouteWhereUniqueInput
      distinct: RouteScalarFieldEnum
      skip: Int
      take: Int
    ): AggregateRoute
  }
  type Mutation {
    createOneRoute(data: RouteCreateInput!): Route!
    updateOneRoute(
      where: RouteWhereUniqueInput!
      data: RouteUpdateInput!
    ): Route!
    deleteOneRoute(where: RouteWhereUniqueInput!): Route
    upsertOneRoute(
      where: RouteWhereUniqueInput!
      create: RouteCreateInput!
      update: RouteUpdateInput!
    ): Route
    deleteManyRoute(where: RouteWhereInput): BatchPayload
    updateManyRoute(
      where: RouteWhereInput
      data: RouteUpdateManyMutationInput
    ): BatchPayload
  }
`

module.exports = {
  Route,
}
