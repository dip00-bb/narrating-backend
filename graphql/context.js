import jwt from 'jsonwebtoken'
import User from '../model/User.js';
export const contextFunction = async ({ req }) => {

    const { accessToken } = req.cookies;
    console.log(accessToken)
    let user = null;

    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            user =await User.findById(decoded._id)
            console.log(user)
        } catch (error) {
            console.log("Invalid token")
        }
    }

    return {
        user,
        req
    }

}