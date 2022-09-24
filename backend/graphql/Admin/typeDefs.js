const {default: gql} = require('graphql-tag')

const Admin = gql`
    # type User {
    #     id: String!
    #     tel: String!
    #     email: String
    #     password: String!
    #     isVerified: String!
    # }
    type _Admin {
        id: String!
    } 
    input AuthAdminInput {
        email: String!
        password: String!
    }
    type AuthAdminOutput {
        token: String!
    }
    type Query {
        meAdmin: Admin!
    }
    type Mutation {
        signInAdmin(data: AuthAdminInput!): AuthAdminOutput!
    }
`

module.exports = {
    Admin
}