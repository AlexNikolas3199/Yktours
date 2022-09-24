const jwt = require('jsonwebtoken')

const checkRoleAdmin = async (authorization, role, prisma, require) => {
    if (!authorization) {
        throw new Error('Not access')
    }
    let error = false
    const verify = await jwt.verify(
        authorization,
        process.env[`TOKEN_SECRET`],
        async (err, decoded) => {
            if (err) {
                if (require) {
                    throw new Error('Not access')
                } else {
                    error = true
                    return null
                }
            }
            return decoded
        }
    )

    if (error) return null

    return verify
}



module.exports = {
    checkRoleAdmin
}