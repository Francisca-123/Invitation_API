const inviteRouter = require('express').Router()

const {
    generateInvite,
    cancelInvite
} = require('../controllers/invite.controller')

inviteRouter.post('invite', generateInvite);
inviteRouter.delete('delete', cancelInvite)

module.exports = inviteRouter