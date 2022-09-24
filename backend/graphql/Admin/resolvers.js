var randomize = require('randomatic')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

const Admin = {
    Query: {
        meAdmin: async (_parent, args, { prisma, checkToken }, info) => {
            const { id } = await checkToken()
            return prisma.admin.findUnique({ where: { id } })
        }
    },
    Mutation: {
        signInAdmin: async (_parent, { data }, { prisma }, info) => {
            const { email, password } = data
            const admin = await prisma.admin.findMany({ where: { email } })
            if (!admin) throw new Error('Wrong email')
            if (admin[0].password === password){
                const token = jwt.sign({ id: admin[0].id }, process.env[`ADMIN_SECRET`])
                return { token }
            } throw new Error('Wrong password')
        }
    }
}

module.exports = {
    Admin
}