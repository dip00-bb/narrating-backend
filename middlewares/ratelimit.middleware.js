import redis from "../db/redis.js";
import { ApiError } from "../ulits/ApiError.js";

export const rateLimiter = () => {
    try {
        return async (req, res, next) => {
            const  ip  = req.ip;
            console.log(ip)

            const endPoint = req?._parsedUrl?.pathname
            const key = `${endPoint + `-` + ip}`
            console.log(key)

            const rateLimit = await redis.get(key)

            if (!rateLimit) {
                await redis.set(key, 1)
                await redis.expire(key, 300)
            }



            if (rateLimit > 5) {
                throw new ApiError(429, "To much request")
            }

            await redis.incr(key)

            next()

        }
    } catch (error) {
        throw new ApiError(429, error?.message || "Something Went Wrong")
    }
}