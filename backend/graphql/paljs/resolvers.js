const { Passengers } = require('./Passengers/resolvers')
const { BookedRoom } = require('./BookedRoom/resolvers')
const { Purchase } = require('./Purchase/resolvers')
const { Route } = require('./Route/resolvers')
const { Ticket } = require('./Ticket/resolvers')
const { User } = require('./User/resolvers')
const { Admin } = require('./Admin/resolvers')

const resolvers = [User, Ticket, Route, Purchase, Admin, BookedRoom, Passengers]

module.exports = { resolvers }