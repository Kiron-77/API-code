const Joi = require('joi');
const { randomString } = require('../../config/helpers.config');
const EmailService = require("../common/mail/email.service");
const { activationToken } = require('./auth.request');
class authController {
    // Todo:function
    register = async (req, res, next) => {
        // Todo:User register
        // validation
        // Db store
        // activation process
        // response
        try {
            const payload = req.body;
            if (req.file) {
                payload.image = req.file.files
            }
            if (req.files) {
                const images = req.files.map((img) => img.filename)
                payload.image = images
            }
            payload.activationToken = randomString(100)
            payload.status = 'notactivated';
            //email send
            let dbStatus = true;
            if (dbStatus) {
                let link = "http://localhost:5173/activate" + payload.activationToken
                let message = `dear ${payload.name},<br/>
               <p> Your account hass been succesfully registered. Please the link below or 
                copy paste the url in the browser to acctivate the account:</p>
                <a href ="${link}">
                </a>
                <br />
                Regards, <br />
                System Admin<br />
                <small>
                    <em>Please do not reply to this email,</em>
                </small>`
                await (new EmailService())
                    .sendEmail(payload.email, "Activate Your Account", message)

            }

            res.json({
                result: payload,
                message: "register data",
                meta: null
            })
        }
        catch (exception) {
            next({
                code: 422,
                message: exception.message,
                meta: null
            })
        }

    }

    verifyActivationToken = (req, res, next) => {
        // Todo:verify token

        res.json({
            result: req.params,
            message: "params",
            meta: null

        })
    }
    activateUser = (req, res, next) => {
        // Todo:activation of the user
        try {
            const success = true;
            if (success) {
                res.json({
                    result: req.body,
                    message: "Account Activated succesfully",
                    meta: null
                })
            } else {
                throw { code: 422, message: "Canot activated at this moment" }
            }

        } catch (exception) {
            next(exception)
        }
    }
    loginUser = (req, res, next) => {
        // Todo:login process 
        try {
            let user = {
                name:"kiran",
                email: "kiran@gmail.com",
                password: "admin1234"
            }
           let success = user;
            if (success) {
                res.json({
                    result: req.body,
                    message: "login succesfully",
                    meta: null
                })
            }else{
                throw{code:422, message:"user login fails"}
            }

        } catch (exception) {
            next(exception)
        }
    

    }
    getLoggedinUser = (req, res, next) => {
        // Todo:get login user
        console.log("i am me")
        res.json({
            result: null,
            message: "i am on route me",
            meta: null
        })
    }
    logoutUser = (req, res, next) => {
        // Todo:logout login user
    }
    sendEmailForForgetPassword = (req, res, next) => {
        // Todo:get email for forget password
        // share reset token to registered account
        // 
        res.json({
            ressult:req.body,
            message:"set new password successfully",
            meta:null
        })
    }
    verifyForgetPasswordToken = (req, res, next) => {
        // Todo:set password for forget
    }
    updatePassword = (req, res, next) => {
        // Todo: set password for forget
        res.json({
            ressult:req.body,
            message:"update password successfully",
            meta:null
        })
    }
}
const authCtrl = new authController()
module.exports = authCtrl;