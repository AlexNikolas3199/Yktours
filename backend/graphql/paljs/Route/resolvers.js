const Route = {
  Query: {
    findUniqueRoute: (_parent, args, { prisma }) => {
      return prisma.route.findUnique(args)
    },
    findFirstRoute: (_parent, args, { prisma }) => {
      return prisma.route.findFirst(args)
    },
    findManyRoute: (_parent, args, { prisma }) => {
      return prisma.route.findMany(args)
    },
    findManyRouteCount: (_parent, args, { prisma }) => {
      return prisma.route.count(args)
    },
    aggregateRoute: (_parent, args, { prisma }) => {
      return prisma.route.aggregate(args)
    },
  },
  Mutation: {
    createOneRoute: (_parent, args, { prisma }) => {
      return prisma.route.create(args)
    },
    updateOneRoute: (_parent, args, { prisma }) => {
      return prisma.route.update(args)
    },
    deleteOneRoute: async (_parent, args, { prisma }) => {
      return prisma.route.delete(args)
    },
    upsertOneRoute: async (_parent, args, { prisma }) => {
      return prisma.route.upsert(args)
    },
    deleteManyRoute: async (_parent, args, { prisma }) => {
      return prisma.route.deleteMany(args)
    },
    updateManyRoute: (_parent, args, { prisma }) => {
      return prisma.route.updateMany(args)
    },
  },
}

module.exports = {
  Route,
}
