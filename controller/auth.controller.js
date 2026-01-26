import User from "../model/User.js";
import { ApiError } from "../ulits/ApiError.js";
import { ApiResponse } from "../ulits/ApiResponse.js";
import { asynceHandler } from "../ulits/asyncHandler.js";

export const handleRegisterUser = asynceHandler(async (req, res) => {

    const { username, email, password } = req.body

    if (!username) {
        throw new ApiError(400, "username is required")
    }

    if (!email) {
        throw new ApiError(400, "email is required")
    }

    if (!password) {
        throw new ApiError(400, "password is required")
    }

    const isUserExist = await User.findOne({ email })
    if (isUserExist) {
        throw new ApiError(409, "This already used. Please Try with a new account Or Login")
    }

    const user = await User.create({
        username,
        email,
        password
    })

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Registration Sucessfull"
        ))
})