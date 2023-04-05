const personModel = require('../models/person.schema')
const { AuthForbiddenException, ValidationException, NotFoundException } = require('../@helpers/error.handlers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function signup(req, res, next){
    const  { firstname, lastname, email, password } = req.body
    try{
    if(!firstname || !lastname || !email || !password){
        return res.status(400).json({
            success:false,
            message:`Invalid. All fields are required`
        }) 
    }

    const person = await personModel.findOne({email:email})

    if(person){
        // return user already exists

        return res.status(400).json({
            success:false,
            message:`User already exists. Login instead`
        })
    }

    // hash the accesscode

    const hashPassword = await bcrypt.hash(password, 10)

    const newPerson = new personModel({
        firstname,
        lastname,
        email,
        access_code:hashPassword
    })

    const {pwd, ...results} = newPerson

    const createdPerson = await newPerson.save()

    res.status(201).json({
        status:'success',
        message:`User created successfully`,
        data:{
            firstname: createdPerson.firstname,
            lastname: createdPerson.lastname,
            access_code: createdPerson.access_code,
            email: createdPerson.email
        }
    })
}
catch(error){
    next(error)
}
}

async function login(req, res , next){
    const { email, password } = req.body

    try{

        if(!email || !password){
            return res.status(404).json({
                success:false,
                message:`Invalid. All fields are required`
            })
        }

        const personInfo = await userModel.findOne({ email: email }).exec()

        if(!personInfo){
            return res.status(400).json({
                success:false,
                message:`User not found. Sign in instead`
            })
        }

       const ispasswordCorrect = await bcrypt.compareSync(password, personInfo.password)

       if(!ispasswordCorrect){
            return res.status(400).json({
                success:false,
                message:`incorrect credentials`
            })
       }

       const tokenPayload = {
        email: personInfo.email,
        id: personInfo._id.toString(),
        name: personInfo.firstname + " " + personInfo.lastname
       }

       const access_token = await jwt.sign(tokenPayload, process.env.SECRET_KEY, {expiresIn:'3h'})

       return res.status(201).json({
            success:true,
            message:`User has being logged in successfully`,
            access_token:access_token
       })


    }
    catch(error){
        next(error)
    }
}


module.exports = {
    signup,
    login
}


