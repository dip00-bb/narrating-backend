import nodemailer from 'nodemailer'
import authConfig from '../auth.config.js'


export const transporter = nodemailer.createTransport(
    {
        service: "gmail",
        port: authConfig.nodemailer_port,
        secure: true,
        logger:true,
        debug:true,
        auth: {
            user: authConfig.nodemailer_user,
            pass: authConfig.nodemailer_app_password
        },
        tls:{
            rejectUnauthorized:true
        }
    }
)


