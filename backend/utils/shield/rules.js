const { rule } = require('graphql-shield')

const { checkRole } = require('./../auth')

const isAuthenticated = rule({ cache: 'contextual' })(
    async (parent, args, { authorization, prisma }, info) => {
        if (authorization)
            return true
        return false
    }
)

const isAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    return checkRole(authorization, "ADMIN", prisma, false)
})

module.exports = {
    isAuthenticated,
    isAdmin
}