const router = require('express').Router()
const authCheck = require('../../middlewares/auth.middleware')
const authCtrl = require('./auth.controller')
const {validator,paramValidator, } =require('../../middlewares/validator.middleware')
const {registerSchema,activationToken, passwordSchema,loginSchema, forgetPasswordSchema, setPasswordSchema} = require('./auth.request')
const uploader = require('../../middlewares/uploader.middleware')

        // ******register user*******/
router.post('/register',uploader.single('image'),validator(registerSchema),authCtrl.register)
router.get('/verify/:token',paramValidator(activationToken),authCtrl.verifyActivationToken)
router.post('/activation/:token',paramValidator(activationToken),validator(passwordSchema),authCtrl.activateUser)

    /********login process */
router.post('/login',validator(loginSchema),authCtrl.loginUser)
router.get('/me',authCheck,authCtrl.getLoggedinUser)
router.get('/logout',authCheck,authCtrl.logoutUser)

    /*****forget password */
router.post('/forget-password',validator(forgetPasswordSchema),authCtrl.sendEmailForForgetPassword)
router.get('/verify-password-token/:token',paramValidator(activationToken),authCtrl.verifyForgetPasswordToken)
router.post('/set-password/:token',validator(setPasswordSchema),paramValidator(activationToken),authCtrl.updatePassword)
module.exports = router;
