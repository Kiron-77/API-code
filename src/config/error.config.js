const router = require('express').Router()

router.use((req,res,next)=>{
    next({code:404, message:"Route not  found"})
})

/******Error handlling middleware ****/
router.use((error,req,res,next)=>{
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

module.exports = router