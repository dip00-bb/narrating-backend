import jwt from 'jsonwebtoken'
import User from '../model/User.js';
export const contextFunction = async ({ req }) => {

    const { accessToken } = req.cookies;

    let user = null;

    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            user = await User.findById(decoded._id)
        } catch (error) {
            user=null
        }
    }

    return {
        user,
        req
    }

}