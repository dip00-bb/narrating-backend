import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})
const authConfig={
    mongodb_uri:process.env.MONGODB_URI,
    brevo_user:process.env.USER_EMAIL,
    brevo_api_key:process.env.BREVO_API_KEY,
    brevo_url:process.env.BREVO_URL
} 


export default authConfig