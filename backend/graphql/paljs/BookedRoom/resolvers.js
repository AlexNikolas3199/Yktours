const BookedRoom = {
  Query: {
    findUniqueBookedRoom: (_parent, args, { prisma }) => {
      return prisma.bookedRoom.findUnique(args)
    },
    findFirstBookedRoom: (_parent, args, { prisma }) => {
      return prisma.bookedRoom.findFirst(args)
    },
    findManyBookedRoom: (_parent, args, { prisma }) => {
      return prisma.bookedRoom.findMany(args)
    },
    findManyBookedRoomCount: (_parent, args, { prisma }) => {
      return prisma.bookedRoom.count(args)
    },
    aggregateBookedRoom: (_parent, args, { prisma }) => {
      return prisma.bookedRoom.aggregate(args)
    },
  },
  Mutation: {
    createOneBookedRoom: (_parent, args, { prisma }) => {
      return prisma.bookedRoom.create(args)
    },
    updateOneBookedRoom: (_parent, args, { prisma }) => {
      return prisma.bookedRoom.update(args)
    },
    deleteOneBookedRoom: async (_parent, args, { prisma }) => {
      return prisma.bookedRoom.delete(args)
    },
    upsertOneBookedRoom: async (_parent, args, { prisma }) => {
      return prisma.bookedRoom.upsert(args)
    },
    deleteManyBookedRoom: async (_parent, args, { prisma }) => {
      return prisma.bookedRoom.deleteMany(args)
    },
    updateManyBookedRoom: (_parent, args, { prisma }) => {
      return prisma.bookedRoom.updateMany(args)
    },
  },
}

module.exports = {
  BookedRoom,
}
