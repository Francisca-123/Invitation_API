const { InvalidOrExpiredToken, AuthForbiddenException} = require('../@helpers/errorHandlers')
const personModel = require('../models/person.schema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function verifyAuth(req, res, next){
   try{
        if(!req.headers.authorization){
            return res.status(401).json({
                success:false,
                message:"Unauthorized Operations"
            })
    }

    const splitToken = req.headers.authorization.split(" ")[1]

    const verifyUser = jwt.verify(splitToken, process.env.SECRET_KEY)
    const userId = verifyUser.id
    if(!userId){
        return res.status(401).json({
            success:false,
            message:`Unathorized operation`
        })
    }


    const auth = await personModel.findById(userId)

    if(!auth){
        return res.status(401).json({
            success:false,
            message:`Unauthorized operation`
        })
    }
    req.user = verifyUser

    next()
}
catch(error){
    
    next(error)
}

}

module.exports = verifyAuth