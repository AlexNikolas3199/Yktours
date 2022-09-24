const { mergeTypeDefs } = require('@graphql-tools/merge')
const { default: gql } = require('graphql-tag')

const { User } = require('./User/typeDefs')
const { Admin } = require('./Admin/typeDefs')
const { Upload } = require('./Upload/typeDefs')

const { sdlInputs } = require('@paljs/plugins')
const { typeDefs: PalJS } = require('./paljs/typeDefs')

const Initial = gql`
    scalar Upload
    scalar Json
`

const typeDefs = mergeTypeDefs([
    sdlInputs(),
    PalJS,
    Initial, 
    User,
    Admin,
    Upload
])

module.exports = { typeDefs }
