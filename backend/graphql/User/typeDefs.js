const {default: gql} = require('graphql-tag')

const User = gql`
    # type User {
    #     id: String!
    #     tel: String!
    #     email: String
    #     password: String!
    #     isVerified: String!
    # }
    type _User {
        id: String!
    } 
    input EmailVerifyInput {
        id: String!
        email: String!
    }
    input AuthInput {
        email: String
    }
    type AuthOutput {
        user: User!
        token: String!
    }
    input PhoneUpdateInput {
        tel: String!
    }
    type PhoneUpdateOutput {
        token: String!
    }
    type Query {
        me: User!
    }
    type Mutation {
        emailVerify(data: EmailVerifyInput!): String!
        phoneUpdate(data: PhoneUpdateInput!): PhoneUpdateOutput!
        phoneUpdateVerify(token: String!, code: String!): String!
        signUp(data: AuthInput!): String!
        signUpVerify(token: String!, code: String!): AuthOutput
        signIn(data: AuthInput!): AuthOutput!
        signInVerify(token: String!, code: String!): AuthOutput
    }
`

module.exports = {
    User
}