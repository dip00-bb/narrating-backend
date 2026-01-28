import nodemailer from 'nodemailer'
import authConfig from './env.config.js'

const transporter = nodemailer.createTransport(
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

function sendMail(to, sub, msg) {
    transporter.sendMail({
        to: to,
        subject: sub,
        html: msg
    })
}

// sendMail("dipchondo007@gmail.com", "Hi", "1234")