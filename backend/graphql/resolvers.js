const { User } = require('./User/resolvers')
const { Admin } = require('./Admin/resolvers')
const { Upload } = require('./Upload/resolvers')
const { resolvers: PalJS } = require('./paljs/resolvers')

const resolvers = [
    ...PalJS,
    User,
    Admin,
    Upload,
]

module.exports = { resolvers }