require('dotenv').config()
const {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageDisabled
} = require("apollo-server-core")
const { ApolloServer } = require('apollo-server-express')
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { applyMiddleware } = require('graphql-middleware')
const { PrismaClient } = require('@prisma/client')
const { PrismaSelect } = require('@paljs/plugins')
const { typeDefs, resolvers } = require('./graphql')
const express = require("express")
const {
    GraphQLUpload,
    graphqlUploadExpress
} = require("graphql-upload")
const SMSru = require('sms_ru');
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport');
const { permissions, checkRole, checkRoleAdmin } = require('./utils')


const cors = require("cors")
const path = require("path")
const bodyParser = require("body-parser")

const prisma = new PrismaClient()

const middleware = async (resolve, root, args, context, info) => {
    const result = new PrismaSelect(info).value
    if (Object.keys(result.select).length > 0) {
        args = {
            ...args,
            ...result
        }
    }
    return resolve(root, args, context, info)
}

const schema = applyMiddleware(
    makeExecutableSchema({
        typeDefs,
        resolvers
    }),
    permissions,
    middleware
)

async function startServer() {
    const server = new ApolloServer({
        introspection: true,
        playground:true,
        plugins: [
				ApolloServerPluginLandingPageGraphQLPlayground()
		],
        schema,
        context: (req) => {
            const sms = new SMSru(process.env["SMS_RU"]);
            const transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                // host: 'smtp.gmail.com',
                auth: {
                    user: 'yaktors@gmail.com',
                    pass: 'ysjregioizrbhezg'
                }
            }));

            const { authorization } = req.req.headers

            const checkToken = async () => {
                const roles = ['USER', 'ADMIN']
                const checks = await Promise.all(
                    roles.map(async (role) => {
                        return await checkRole(authorization, role, prisma, false)
                    })
                )
                const find = checks.find((object) => object)
                if (!find) throw new Error('Token timeout')
                return find
            }

            const checkTokenAdmin = async () => {
                const roles = ['MODERATOR', 'ADMIN']
                const checks = await Promise.all(
                    roles.map(async (role) => {
                        return await checkRoleAdmin(authorization, role, prisma, false)
                    })
                )
                const find = checks.find((object) => object)
                if (!find) throw new Error('Token timeout')
                return find
            }

            // const app = express()
            // app.use(cors())
            // app.use(bodyParser.json())
            // app.use(graphqlUploadExpress({ maxFileSize: 10000, maxFiles: 10 }));

            return {
                prisma,
                authorization,
                checkToken,
                checkTokenAdmin,
                sms,
                transporter
            }
        }
    })
	await server.start()

	const app = express()
	
	app.use(graphqlUploadExpress())

	app.use(cors())
	app.use(bodyParser.json())


	server.applyMiddleware({ app, path: '/' })

	const port = process.env["APOLLO_PORT"] || 8000

	await new Promise((r) => { return app.listen({ port }, r)})

	console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
}

startServer()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static("public"))

app.listen({ port: process.env.PORT_EXPRESS || 8001 }, () => {
    console.log(`upload server running http://localhost:${process.env.PORT_EXPRESS || 8001}/`)
})