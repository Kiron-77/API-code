const authCheck = (req,res,next)=>{
    // Todo:login or not login checked
    console.log("i am on auth middleware")
    next()
}
module.exports = authCheck;