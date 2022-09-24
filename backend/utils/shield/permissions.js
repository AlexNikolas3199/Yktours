const { shield, and, or, not } = require('graphql-shield')    

const rules = require('./rules')

const permissions = shield({
    Query: {
        me: rules.isAuthenticated
    }
}, 
{
    allowExternalErrors: true,
    fallbackError: 'No permission'
})

module.exports = {
    permissions
}