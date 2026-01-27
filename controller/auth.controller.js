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

    const createdUser = await User.create({
        username,
        email,
        password
    })

    if (!createdUser) {
        throw new ApiError(500, "Something Went Wrong While create new user. Please try again")
    }

    const user = await User.findById(createdUser._id).select("-password -refreshToken")

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Registration Sucessfull"
        ))
})


export const handleUserLogin = asynceHandler(async (req, res) => {

    const { email, password } = req.body


    if (!email) {
        throw new ApiError(400, "email is required")
    }

    if (!password) {
        throw new ApiError(400, "password is required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User not exist")
    }

    const isCorrectPassword = await user.isPasswordCorrect(password);


    const loogedInUser={
        _id:user._id,
        username:user.username,
        email:user.email,
        __V:user.__v
    }

    if (!isCorrectPassword) {
        throw new ApiError(401, "Unauthorize Access")
    }

    

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {user:loogedInUser},
                "Log in successfull"
            )
        )

})