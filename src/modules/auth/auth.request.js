const  Joi =require('joi')

const registerSchema = Joi.object({
    name:Joi.string().min(2).max(30).required(),
    email:Joi.string().email().required(),
    address:Joi.string().empty(),
    phone:Joi.string().pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/),
    role:Joi.string().pattern(/^(customer|seller|admin)$/)
})
const activationToken = Joi.object({
    token:Joi.string().length(100).required()
})
const passwordSchema = Joi.object({
    password:Joi.string().min(8).max(25).required(),
    confirmPassword:Joi.ref('password')
})
const loginSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
    
})
// const forgetPasswordSchema = Joi.object({
//     email:Joi.string().email().required(),
// })
// const setPasswordSchema = Joi.object({
//     email:Joi.string().email().required(),
//     newPassword:Joi.string().min(8).max(30).required(),
//     confirmPassword:Joi.ref('newPassword')
// })
module.exports={
    registerSchema,
    activationToken,
    passwordSchema,
    loginSchema   
}