const inviteModel = require('../models/invite.schema')

const {
    NotFoundException,
    ValidationException,
    AuthForbiddenException,
    InvalidOrExpiredToken
} = require('../@helpers/error.handlers')
const personModel = require('../models/person.schema')



async function generateInvite(req, res, next){
    const {email, password, invite_code} = req.body

    try{

        if(!email || !password || invite_code){
            throw new ValidationException("All fields are required")
        }

        if(invite_code.length < 6 || invite_code > 6){
            return res.status(404).json({
                success:false,
                message:`Invite code must not be greater or less than 6`
            })
        }

        if(invite_code !== 123456){
            return res.status(404).json({
                success:false,
                message:`Access denied`
            })
        }

        const generateRandom1 = Math.floor(Math.random() * 10) + 1
        const generateRandom2 = Math.floor(Math.random() * 10) + 1
        const generateRandom3 = Math.floor(Math.random() * 10) + 1
        const generateRandom4 = Math.floor(Math.random() * 10) + 1

        const inviteNumber = `code ${generateRandom1}${generateRandom2}${generateRandom3}${generateRandom4}`

        const newInvite = new inviteModel({
            email,
            inviteNumber:inviteNumber
        })
    await newInvite.save()
    return newInvite
    }
    catch(error){

    }
}

async function cancelInvite(req, res, next){
    const {id} = req.params
    try{
        const getInvite = await inviteModel.findOne({_id:id}).exec()

        if(!getInvite){
            return res.status(400).json({
                success:false,
                message:`Invite not found`
            })
        }

        const deleteInvite = await inviteModel.findByIdAndRemove({_id: id })

        return res.json({
            status: 'success',
            message: "Donor deleted successfully"
        })
    }
    catch(error){

    }

}