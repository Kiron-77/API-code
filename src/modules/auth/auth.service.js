require('dotenv').config()
const { randomString } = require('../../config/helpers.config')
// const MongodbServices = require('../common/database/mongodb.service')
const EmailService = require('../common/mail/email.service')
const UserModel = require('../user/user.model')
class AuthService {
    registerUser = async (data) => {
        try {
            const user = new UserModel(data)
            const response = await user.save()
            console.log(response)
            // const response = await this.db.collection('users').insertOne(data)
            let link = process.env.FRONTEND_URL+"/activate/" + data.activationToken
            let message = `dear ${user.name},<br/>
                   <p> Your account has been succesfully registered. Please the link below or 
                    copy paste the url in the browser to acctivate the account:</p>
                    <a href="${link}">${link}
                    </a>
                    <br />
                    Regards, <br />
                    System Admin<br />
                    <small>
                        <em>Please do not reply to this email,</em>
                    </small>`
            await (new EmailService())
                .sendEmail(data.email, "Activate Your Account", message)
            return response;
        } catch (exception) {
            throw exception
        }
    }
    getUserByActivationToken = async (token) => {
        try {
            let data = await this.getSingleUserByFilter({activationToken:token})
            if (!data) {
                throw { code: 400, message: "Token does not exist.." }
            }
            return data;
        } catch (exception) {
            throw exception

        }
    }
    updateUserById = async (id, data) => {
        try {
            const response = await UserModel.findByIdAndUpdate(id, { $set: data });
            // const response = await UserModel.findOneAndUpdate({_id:id},{$set:data});
            // const response = await UserModel.updateOne({_id:id},{$set:data});
            return response;
        } catch (exception) {
            throw exception;
        }
    }
    getSingleUserByFilter = async (filter) => {
        try{
            const userDetail = await UserModel.findOne(filter)
            return userDetail;
        }catch(exception){
            throw exception;

        }
    }
    sendForgetPasswordMail = async(user)=>{
        try{
            const forgetToken = randomString(100)
            const status = await UserModel.findOneAndUpdate({
                email:user.email
            },{$set:{
                forgetPasswordToken:forgetToken,
            }})
            const link = process.env.FRONTEND_URL + "/reset-password/" + forgetToken
            const message = `Dear ${user.name},<br/>
            If you have requested to reset the password, Please click th link below.
            Or you can Ignore the message.
            <br />
            <a href ='${link}'>${link}
            </a>
            <br />
            <strong>Regards</strong>
            <strong><small>${process.env.FROM_ADDRESS}</small></strong>
            `;
            (new EmailService()).sendEmail(
                user.email,
                "Reset Password email",
                message
            )
            return status;
        }catch(exception){
            throw exception
        }
    }
}

const authSvc = new AuthService();
module.exports = authSvc;