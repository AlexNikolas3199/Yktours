const Admin = {
  Query: {
    findUniqueAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.findUnique(args)
    },
    findFirstAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.findFirst(args)
    },
    findManyAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.findMany(args)
    },
    findManyAdminCount: (_parent, args, { prisma }) => {
      return prisma.admin.count(args)
    },
    aggregateAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.aggregate(args)
    },
  },
  Mutation: {
    createOneAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.create(args)
    },
    updateOneAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.update(args)
    },
    deleteOneAdmin: async (_parent, args, { prisma }) => {
      return prisma.admin.delete(args)
    },
    upsertOneAdmin: async (_parent, args, { prisma }) => {
      return prisma.admin.upsert(args)
    },
    deleteManyAdmin: async (_parent, args, { prisma }) => {
      return prisma.admin.deleteMany(args)
    },
    updateManyAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.updateMany(args)
    },
  },
}

module.exports = {
  Admin,
}
