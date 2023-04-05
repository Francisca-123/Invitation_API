if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const startDB = require('./@helpers/db.configs')
const authRouter = require('./routes/auth.routes')
const inviteRouter = require('./routes/invite.routes')

const app = express()

startDB()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const api_version = `v1`
app.use(`/${api_version}/auth`, authRouter)
app.use(`/${api_version}/invite`, inviteRouter)

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Server running at port ${port}`)
})