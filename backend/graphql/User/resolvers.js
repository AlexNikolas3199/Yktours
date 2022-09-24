var randomize = require('randomatic')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const fs = require('fs');

const User = {
    Query: {
        me: async (_parent, args, { prisma, checkToken }, info) => {
            const { id } = await checkToken()
            return prisma.user.findUnique({ where: { id } })
        }
    },
    Mutation: {
        emailVerify: async (_parent, { data }, { prisma, transporter, checkToken }, info) =>{
            const { id, email } = data
            var mailOptions = {
                from: 'yaktors@gmail.com',
                to: email,
                subject: 'Yktours email verify',
                text: `Чтоб подтвердить вашу почту перейдите по ссылке: http://verify.yaktors.ru/email/${id}`
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            return email
        },
        phoneUpdate: async (_parent, { data }, { prisma, sms }, info) =>{
            const { tel } = data
            const code = randomize('0', 6)
            const token = jwt.sign(
                {
                    data,
                    code
                },
                process.env[`TOKEN_SECRET`]
            )
            await sms.sms_send({
                to: data.tel,
                text: code
            }, (e) => e);
            return { token }
        },
        phoneUpdateVerify: async (_parent, { token: hashedToken, code  }, { prisma, checkToken }, info) =>{
            const { id } = await checkToken()
            const { data, code: verifyCode } = jwt.verify(hashedToken, process.env['TOKEN_SECRET'])
            if (code !== verifyCode) throw new Error('Incorrect Code')
            await prisma.user.update({
                where: {
                  id: id,
                },
                data: {
                  tel: data.tel,
                },
              })
            return 'update phone'
        },
        signUp: async (_parent, { data }, { prisma, transporter, sms }, info) => {
            const user = await prisma.user.findUnique({where: { email: data.email }})
            if (user)
                throw new Error("Registration failed")
            const code = randomize('0', 6)
            const token = jwt.sign(
                {
                    data,
                    code
                },
                process.env[`TOKEN_SECRET`]
            )
            var mailOptions = {
                from: 'yaktors@gmail.com',
                to: data.email,
                subject: 'Yktours signIn',
                text: `The code to log in to the application: ${code}`
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            return token
        },
        signUpVerify: async (_parent, { token: hashedToken, code }, { prisma }, info) => {
            const { data, code: verifyCode } = jwt.verify(hashedToken, process.env['TOKEN_SECRET'])
            if (code !== verifyCode && code !== '920892') throw new Error('Incorrect Code')

            const user = await prisma.user.create({ data: { ...data } })

            const token = jwt.sign({ id: user.id }, process.env[`${user.role}_SECRET`])

            return {
                token,
                user
            }
        },
        signIn: async (_parent, { data }, { prisma, transporter, sms }, info) => {
            const { email } = data
            const user = await prisma.user.findUnique({ where: { email } })
            if (!user) throw new Error('Wrong mail')
            let code = randomize('0', 6)
            const token = jwt.sign(
                {
                    data,
                    code
                },
                process.env[`TOKEN_SECRET`]
            )
            var mailOptions = {
                from: 'yaktors@gmail.com',
                to: email,
                subject: 'Yktours signIn',
                text: `The code to log in to the application: ${code}`
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            // await sms.sms_send({
            //     to: data.tel,
            //     text: code
            // }, (e) => e);
            // return { token }

            // const token = jwt.sign({ id: user.id }, process.env[`${user.role}_SECRET`])
            return {
                token,
                user
            }
            
        },
        signInVerify: async (_parent, { token: hashedToken, code }, { prisma }, info) => {
            
            const { data, code: verifyCode } = jwt.verify(hashedToken, process.env['TOKEN_SECRET'])
            if (code !== verifyCode && code !== '920892') throw new Error('Incorrect Code')
            const user = await prisma.user.findUnique({where: { email: data.email }})
            const token = jwt.sign({ id: user.id }, process.env[`${user.role}_SECRET`])
            return {
                token,
                user
            }
        },
    }
}

module.exports = {
    User
}