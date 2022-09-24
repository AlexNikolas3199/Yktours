const Passengers = {
  Query: {
    findUniquePassengers: (_parent, args, { prisma }) => {
      return prisma.passengers.findUnique(args)
    },
    findFirstPassengers: (_parent, args, { prisma }) => {
      return prisma.passengers.findFirst(args)
    },
    findManyPassengers: (_parent, args, { prisma }) => {
      return prisma.passengers.findMany(args)
    },
    findManyPassengersCount: (_parent, args, { prisma }) => {
      return prisma.passengers.count(args)
    },
    aggregatePassengers: (_parent, args, { prisma }) => {
      return prisma.passengers.aggregate(args)
    },
  },
  Mutation: {
    createOnePassengers: (_parent, args, { prisma }) => {
      return prisma.passengers.create(args)
    },
    updateOnePassengers: (_parent, args, { prisma }) => {
      return prisma.passengers.update(args)
    },
    deleteOnePassengers: async (_parent, args, { prisma }) => {
      return prisma.passengers.delete(args)
    },
    upsertOnePassengers: async (_parent, args, { prisma }) => {
      return prisma.passengers.upsert(args)
    },
    deleteManyPassengers: async (_parent, args, { prisma }) => {
      return prisma.passengers.deleteMany(args)
    },
    updateManyPassengers: (_parent, args, { prisma }) => {
      return prisma.passengers.updateMany(args)
    },
  },
}

module.exports = {
  Passengers,
}
