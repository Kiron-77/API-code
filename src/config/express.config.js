const express = require('express');
const app = express();
require('./db.config')
const router = require('../routes/router')

// const errorRoutes = require('./error.config')

// body parser
app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));

// routes
app.use('/api/v1/',router)
app.use((req,res,next)=>{
    next({code:404, message:"Route not  found"})
})

/******Error handlling middleware ****/
app.use((error,req,res,next)=>{
    console.log('Garbage',error)
    const code = error.code ?? 500;
    const message = error.message ?? "server error"
    const result = error.result ?? null
    res.status(code).json({
        result:result,
        message:message,
        meta:null
    })
})
// app.use(errorRoutes);
module.exports=app;



// create 5 user point as following
// users>>get>>response>>list all the users
// user>>post>>response>>user created successfully
// user/1>>>put>>response>>user updated succesfully for id:1
// user/1>>get>>response>>>user detail fetch for id:1
// user/1>>delete>>response>>user delete for id:1



    
