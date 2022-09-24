const { permissions } = require('./shield/permissions')
const { processUpload, deleteFile } = require('./upload')
const { checkRole } = require('./auth')

module.exports = {
    permissions,
    processUpload,
    deleteFile,
    checkRole
}