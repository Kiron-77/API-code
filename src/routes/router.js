const express = require('express')
const app = express()
const authRouter =require('../modules/auth/auth.router')
app.use("/auth",authRouter)
// const userRouter = require('../modules/user/user.router.js')
// app.use("/user",userRouter)


module.exports=app;