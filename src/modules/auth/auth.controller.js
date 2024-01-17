// const Joi = require('joi');
require('dotenv').config();
const { randomString } = require('../../config/helpers.config');
// const EmailService = require("../common/mail/email.service");
// const {MongoClient} = require('mongodb');
// const MongodbServices = require('../common/database/mongodb.service');
const authSvc = require('./auth.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class authController {
    // Todo:function
    register = async (req, res, next) => {
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
            const dbStatus = await authSvc.registerUser(payload)
            res.json({
                result: dbStatus,
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

    verifyActivationToken = async (req, res, next) => {
        try {
            let data = await authSvc.getUserByActivationToken(req.params.token)
            res.json({
                result: data,
                message: "User Verified",
                meta: null
            })
        } catch (exception) {
            console.log(exception)
            next(exception)
        }
    }
    activateUser = async (req, res, next) => {
        try {
            const userDetail = await authSvc.getUserByActivationToken(req.params.token)
            const data = {
                password: bcrypt.hashSync(req.body.password, 10),
                activationToken: null,
                status: "activated"
            };
            const response = await authSvc.updateUserById(userDetail._id, data)
            res.json({
                result: response,
                message: "Your account has been updated successfully",
                meta: null
            })
        } catch (exception) {
            next(exception)
        }

    }
    loginUser = async (req, res, next) => {
        // Todo:login process 
        try {
            const { email, password } = req.body;
            const userDetail = await authSvc.getSingleUserByFilter({ email })
            if (!userDetail) {
                throw { code: 422, message: "User does not exist", result: { email } }
            }
            if (userDetail && userDetail.status === 'activated') {
                if (bcrypt.compareSync(password, userDetail.password)) {
                    const token = jwt.sign({
                        userId: userDetail._id
                    }, process.env.JWT_SECRET, {
                        expiresIn: "1  day",
                        subject: `${userDetail._id}`
                    })
                    res.json({
                        result: {
                            token: token,
                            type: "Bearer",
                            userDetail: {
                                userId:userDetail._id,
                                name:userDetail.name,
                                email:userDetail.email,
                                role:userDetail.role
                            }
                        },
                        message: "User logged in successfully",
                        meta: null
                    })
                } else {
                    throw { code: 422, message: "Credentiasl doesnot match" };
                }
            } else {
                throw { code: 422, message: "User is not activated or is suspended", result: { email } }
            }
        } catch (exception) {
            next(exception)
        }

    }
    getLoggedInUser = (req, res, next) => {
        const loggedInUser = req.authUser
        res.json({
            result: loggedInUser,
            message: "I am on me router",
            meta: null
        })
    }
    logoutUser = (req, res, next) => {
        // Todo:logout login user
    }
    sendEmailForForgetPassword = async (req, res, next) => {
        try {
            const { email } = req.body;
            const userDetail = await authSvc.getSingleUserByFilter({
                email: email
            })
            if (!userDetail) {
                throw { code: 422, message: "User doesnot exist", result: { email } }
            } else {
                await authSvc.sendForgetPasswordMail(userDetail)
                res.json({
                    result: null,
                    message: "An email has been sent to the registered email.Please check your email for futher processing.",
                    meta: null
                })
            }
        } catch (exception) {
            next(exception)
        }

    }
    verifyForgetPasswordToken = async (req, res, next) => {
        try {
            let userDetail = await authSvc.getSingleUserByFilter({ forgetPasswordToken: req.params.token })
            if (userDetail) {
                res.json({
                    result: userDetail,
                    message: "User does exist and verified",
                    meta: null
                })
            } else {
                throw { code: 422, message: "Token doesnot exist or expired" }
            }

        } catch (exception) {

        }
    }
    updatePassword = async (req, res, next) => {
        try {
            const userDetail = await authSvc.getSingleUserByFilter({ forgetPasswordToken: req.params.token })
            if (!userDetail) {
                throw { code: 422, message: "Token doesnot exist or expired" }
            } else {
                const data = {
                    password: bcrypt.hashSync(req.body.password, 10),
                    forgetPasswordToken: null,
                    status: "activated"
                };
                const response = await authSvc.updateUserById(userDetail._id, data)
                res.json({
                    result: response,
                    message: "Your password has been updated successfully",
                    meta: null
                })
            }
        } catch (exception) {
            next(exception)
        }
    }
}
const authCtrl = new authController()
module.exports = authCtrl;