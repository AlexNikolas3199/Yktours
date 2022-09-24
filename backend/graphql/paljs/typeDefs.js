const { Passengers } = require('./Passengers/typeDefs')
const { BookedRoom } = require('./BookedRoom/typeDefs')
const { Purchase } = require('./Purchase/typeDefs')
const { Route } = require('./Route/typeDefs')
const { Ticket } = require('./Ticket/typeDefs')
const { User } = require('./User/typeDefs')
const { Admin } = require('./Admin/typeDefs')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { sdlInputs } = require('@paljs/plugins')

const typeDefs = mergeTypeDefs([sdlInputs(), User, Ticket, Route, Purchase, Admin, BookedRoom, Passengers])

module.exports = { typeDefs }
