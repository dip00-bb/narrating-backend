import dotenv from 'dotenv'
dotenv.config()
const authConfig={
    mongodb_uri:process.env.MONGODB_URI
} 



export default authConfig