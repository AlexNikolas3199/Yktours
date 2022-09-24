const axios = require('axios')
var randomize = require('randomatic')

const Purchase = {
  Query: {
    findStatusPurchase: async (_parent, args, { prisma }) => {
      const post = await axios.post(`https://pay.alfabank.ru/payment/rest/getOrderStatus.do?orderId=${args.where.orderId}&lang=ru&userName=${process.env["BANK_USER"]}&password=${process.env["BANK_PASSWORD"]}`)
        .then(function (response) {
          return response
        })
        .catch(function (error) {
          return error
        });
      return post.data
    },
    findUniquePurchase: (_parent, args, { prisma }) => {
      return prisma.purchase.findUnique(args)
    },
    findFirstPurchase: (_parent, args, { prisma }) => {
      return prisma.purchase.findFirst(args)
    },
    findManyPurchase: async (_parent, args, { prisma }) => {
      return prisma.purchase.findMany(args)
    },
    findManyPurchaseCount: (_parent, args, { prisma }) => {
      return prisma.purchase.count(args)
    },
    aggregatePurchase: (_parent, args, { prisma }) => {
      return prisma.purchase.aggregate(args)
    },
  },
  Mutation: {
    refundInput: async (_parent, args, { prisma }) => {
      console.log(args.data.id, 'id')
      const ticket = await prisma.ticket.findMany({where: { orderId : args.data.orderId }})
      // const route = await prisma.route.findMany({where: { ticket: { orderId : args.data.orderId } }})
      // console.log(ticket, 'ticket')
      // console.log(route, 'route')
      const post = await axios.post(`https://pay.alfabank.ru/payment/rest/refund.do?userName=${process.env["BANK_USER"]}&password=${process.env["BANK_PASSWORD"]}&orderId=${args.data.orderId}&amount=${args.data.amount}`)
        .then(function (response) {
          return response
        })
        .catch(function (error) {
          return error
        });
      return post.data
    },
    createOnePurchase: async (_parent, args, { prisma }) => {
      const orderNumber = randomize('Aa0', 20)
      const post = await axios.post(`https://pay.alfabank.ru/payment/rest/register.do?userName=${process.env["BANK_USER"]}&password=${process.env["BANK_PASSWORD"]}&orderNumber=${orderNumber}&amount=${args.data.amount}&returnUrl=http://purchase.yaktors.ru`)
        .then(function (response) {
          return response
        })
        .catch(function (error) {
          return error
        });
      let orderId = await post.data.orderId
      let formUrl = await post.data.formUrl
      args.data.orderNumber = `${orderNumber}`
      args.data.url = `${formUrl}`
      args.data.orderId = `${orderId}`
      return prisma.purchase.create(args)
    },
    updateOnePurchase: (_parent, args, { prisma }) => {
      return prisma.purchase.update(args)
    },
    deleteOnePurchase: async (_parent, args, { prisma }) => {
      return prisma.purchase.delete(args)
    }
  },
}

module.exports = {
  Purchase,
}
