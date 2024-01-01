const nodemailer = require('nodemailer')
class EmailService{
    transporter;
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port:587,
            auth:{
                user:"40e81b7dd5ab96",
                pass:"5a1226c8215547"
            }
        })
        this.sendEmail = async(to,subject,message)=>{
            try{  
                 await this.transporter.sendMail({
                to:to,
                from:"kiran@234gmail.com",
                subject:subject,
                html:message,
                
            })
         }catch(exception){
            console.log("SendEmail:",exception)
            throw exception
         }
         
            }
        }
    }
   
module.exports = EmailService;

