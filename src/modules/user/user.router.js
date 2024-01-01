// const router = require('express').Router()
const express = require('express')
const router = express.Router()

router.route('/users')
    
    .post((req, res, next) => {
        let id = req.params.id;
        res.json({
            result: "Users created succesfully",
            message: "Users created succesfully",
            meta: null
        })
    })
    .get((req,res,next)=>{
        let id=req.params.id;
        res.json({
            result:"Users list",
            message:"User List",
            meta:null
        })
    }) 
  

router.route('/user/:id')
.get((req, res, next) => {
    let id = req.params.id;
    res.json({
        result: "Users detail of id:" + id,
        message: "Users detail of id:" + id,
        meta: null
    })
})
    .put((req, res, next) => {
        let id = req.params.id;
        res.json({
            result: "Users Edited of id:" + id,
            message: "Users Updated succesfully for id:" + id,
            meta: null
        })
    })

    .delete((req, res, next) => {
        let id = req.params.id;
        res.json({
            result: "Users deleted succesfully for id:" + id,
            message: "Users deleted succesfully for id:" + id,
            meta: null
        })
    })
    module.exports = router