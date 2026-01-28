import User from "../model/User.js";
import { ApiError } from "../ulits/ApiError.js";
import jwt from 'jsonwebtoken'

export const verifyUser = () => {
    return async (req, res, next) => {
        const {accessToken} = req.cookies;
        try {
            if (!accessToken) {
                throw new ApiError(401, "unauthorize access");
            }

            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

            if (!decoded) {
                throw new ApiError(401, "unauthorize access");
            }

            const user = await User.findById(decoded._id).select("-password -refreshToken")

            if (!user) {
                throw new ApiError(404, "no user found")
            }
            req.user = user
            next()
        } catch (error) {
            throw new ApiError(401, error?.message || "Can not verify the user")
        }
    }
}