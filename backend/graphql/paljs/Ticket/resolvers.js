var pdf = require('pdf-creator-node')
var fs = require('fs')
var moment = require('moment')
var rubles = require('rubles').rubles
const shortid = require('shortid')

const Ticket = {
  Query: {
    findUniqueTicketByOrderId: (_parent, args, { prisma }) => {
      console.log(prisma.ticket.findUnique(args))
      return prisma.ticket.findUnique(args)
    },
    findUniqueTicket: (_parent, args, { prisma }) => {
      return prisma.ticket.findUnique(args)
    },
    findFirstTicket: (_parent, args, { prisma }) => {
      return prisma.ticket.findFirst(args)
    },
    findManyTicket: (_parent, args, { prisma }) => {
      return prisma.ticket.findMany(args)
    },
    findManyTicketCount: (_parent, args, { prisma }) => {
      return prisma.ticket.count(args)
    },
    aggregateTicket: (_parent, args, { prisma }) => {
      return prisma.ticket.aggregate(args)
    },
  },
  Mutation: {
    createOneTicket: async (_parent, args, { prisma, transporter }) => {
      const user = await prisma.user.findUnique({ where: { id: args.data.user.connect.id } })
      const route = await prisma.route.findUnique({ where: { id: args.data.route.connect.id } })
      var posadochHtml = fs.readFileSync('./docs/posadochniy.html', 'utf8')
      var putevkaHtml = fs.readFileSync('./docs/putevka.html', 'utf8')
      var html = fs.readFileSync('./docs/1234.html', 'utf8')
      var options = {
        format: 'A3',
        orientation: 'portrait',
        border: '5mm',
      }

      const randomNamePosadoch = shortid.generate()
      const randomNamePutevki = shortid.generate()
      const randomName = shortid.generate()
      const amount = args.data.amount.toString()
      const totalAmount = amount.slice(0, -2)
      const shipName = (route) => {
        if (route.ship == 1) {
          return 'Михаил Светлов'
        } else {
          return 'Демьян Бедный'
        }
      }

      const startDate = moment.utc(route.date).format('DD MM YYYY HH:mm')
      const endDate = moment.utc(route.date).add(16, 'hours').format('DD MM YYYY HH:mm')
      const passenger = args.data.passengers.createMany.data
      const birthdayDate = moment.utc(passenger[0].dateOfBirth).format('DD.MM.YYYY')

      console.log(passenger, 'PEOPLES')

      const rooms = (room, ship) => {
        if (ship == 1) {
          if (room >= 100 && room <= 105) {
            return room + ' ' + '( Стандарт 1 )'
          }
          if (room >= 106 && room <= 113) {
            return room + ' ' + '( Полулюкс 2 )'
          }
          if (room >= 114 && room <= 137) {
            return room + ' ' + '( Стандарт 4 )'
          }
          if (room >= 200 && room <= 201) {
            return room + ' ' + '( Люкс 2 )'
          }
          if (room >= 202 && room <= 208) {
            return room + ' ' + '( Стандарт 2 )'
          }
          if (room == 209) {
            return room + ' ' + '( Стандарт 3 )'
          }
          if (room == 210) {
            return room + ' ' + '( Стандарт 2 )'
          }
          if (room >= 211 && room <= 234) {
            return room + ' ' + '( Стандарт 2 )'
          }
          if (room == 308) {
            return room + ' ' + '( Люкс 2 )'
          }
        } else {
          if (room >= 100 && room <= 105) {
            return room + ' ' + '( Стандарт 1 )'
          }
          if (room >= 106 && room <= 113) {
            return room + ' ' + '( Полулюкс 2 )'
          }
          if (room >= 114 && room <= 137) {
            return room + ' ' + '( Стандарт 4 )'
          }
          if (room >= 200 && room <= 201) {
            return room + ' ' + '( Люкс 2 )'
          }
          if (room >= 202 && room <= 210) {
            return room + ' ' + '( Полулюкс 2 )'
          }
          if (room >= 211 && room <= 234) {
            return room + ' ' + '( Стандарт 3 )'
          }
          if (room == 308) {
            return room + ' ' + '( Люкс 2 )'
          }
        }
      }
      var users = [
        {
          id: randomName,
          idPutevki: randomNamePutevki,
          name: passenger[0].name,
          surname: passenger[0].surname,
          patronymic: passenger[0].patronymic,
          amount: totalAmount,
          email: user.email,
          ship: shipName(route),
          route: route.route.join(', '),
          duration: route.duration + ' часа/часов',
          startDate: startDate,
          endDate: endDate,
          room: rooms(args.data.room, route.ship),
          peoples: passenger.length,
          docsType: passenger[0].documentType,
          docsNumber: passenger[0].documentNumber,
          birthdayDate: birthdayDate,
          totalCost: rubles(totalAmount),
          day: route.createdAt.getDate(),
          month: route.createdAt.getMonth(),
          year: route.createdAt.getFullYear() - 2000,

          turist1: `${passenger[0].name} ${passenger[0].surname} ${passenger[0].patronymic}, ${
            passenger[0].documentNumber
          }, ${new Date(passenger[0].dateOfBirth).toLocaleDateString('ru-RU')}`,
          turist2: passenger[1]
            ? `${passenger[1].name} ${passenger[1].surname} ${passenger[1].patronymic}, ${
                passenger[1].documentNumber
              }, ${new Date(passenger[1].dateOfBirth).toLocaleDateString('ru-RU')}`
            : '',
          turist3: passenger[2]
            ? `${passenger[2].name} ${passenger[2].surname} ${passenger[2].patronymic}, ${
                passenger[2].documentNumber
              }, ${new Date(passenger[2].dateOfBirth).toLocaleDateString('ru-RU')}`
            : '',
          turist4: passenger[3]
            ? `${passenger[3].name} ${passenger[3].surname} ${passenger[3].patronymic}, ${
                passenger[3].documentNumber
              }, ${new Date(passenger[3].dateOfBirth).toLocaleDateString('ru-RU')}`
            : '',
          createdAt: route.createdAt.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }),
          turistCount: passenger.length,
          routePoint: route.route[1],
          timeGoAndCame:
            route.date.toLocaleDateString('ru-RU', {
              hour: 'numeric',
              minute: 'numeric',
              month: 'long',
              day: 'numeric',
            }) +
            ' - ' +
            new Date(route.date.getTime() + route.duration * 60 * 60 * 1000).toLocaleDateString('ru-RU', {
              hour: 'numeric',
              minute: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          food: passenger.map((item) => item.food).join(', '),
        },
      ]
      var document = {
        html: html,
        data: {
          users: users,
        },
        path: `./pdfoutput/${randomName}.pdf`,
        type: '',
      }

      var documentPutevka = {
        html: putevkaHtml,
        data: {
          users: users,
        },
        path: `./pdfoutput/${randomNamePutevki}.pdf`,
        type: '',
      }

      var documentPosadoch = {
        html: posadochHtml,
        data: {
          users: users,
        },
        path: `./pdfoutput/${randomNamePosadoch}.pdf`,
        type: '',
      }

      const createPdf = async () => {
        await pdf
          .create(documentPosadoch, options)
          .then((res) => {
            console.log(res)
          })
          .catch((error) => {
            console.error(error)
          })
        await pdf
          .create(documentPutevka, options)
          .then((res) => {
            console.log(res)
          })
          .catch((error) => {
            console.error(error)
          })
        await pdf
          .create(document, options)
          .then((res) => {
            console.log(res)
          })
          .catch((error) => {
            console.error(error)
          })
      }

      await createPdf()

      var mailOptions = {
        from: 'yaktors@gmail.com',
        to: user.email,
        subject: 'Yktours travel package',
        text: `Путевка`,
        attachments: [
          {
            filename: 'contract.pdf',
            content: fs.createReadStream(`./pdfoutput/${randomName}.pdf`),
          },
          {
            filename: 'TravelPackage.pdf',
            content: fs.createReadStream(`./pdfoutput/${randomNamePutevki}.pdf`),
          },
          {
            filename: 'boarding.pdf',
            content: fs.createReadStream(`./pdfoutput/${randomNamePosadoch}.pdf`),
          },
        ],
      }
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
      return prisma.ticket.create(args)
    },
    updateOneTicket: (_parent, args, { prisma }) => {
      return prisma.ticket.update(args)
    },
    deleteOneTicket: async (_parent, args, { prisma }) => {
      return prisma.ticket.delete(args)
    },
    upsertOneTicket: async (_parent, args, { prisma }) => {
      return prisma.ticket.upsert(args)
    },
    deleteManyTicket: async (_parent, args, { prisma }) => {
      return prisma.ticket.deleteMany(args)
    },
    updateManyTicket: (_parent, args, { prisma }) => {
      return prisma.ticket.updateMany(args)
    },
  },
}

module.exports = {
  Ticket,
}
