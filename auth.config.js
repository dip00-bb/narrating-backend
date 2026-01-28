import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})
const authConfig={
    mongodb_uri:process.env.MONGODB_URI,
    nodemailer_service:process.env.NODEMAILER_SERVICE,
    nodemailer_port:process.env.NODEMAILER_PORT,
    nodemailer_user:process.env.USER_EMAIL,
    nodemailer_app_password:process.env.GOOGLE_APP_PASSWORD
} 


export default authConfig