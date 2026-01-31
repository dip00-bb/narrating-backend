import Redis from 'ioredis'
import dotenv from 'dotenv'
dotenv.config()


const redis = new Redis({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT

})

redis.on("connect", () => console.log("Redis Connected"))

redis.on("error", (error) => console.log(error, "Redis not connected"))

export default redis