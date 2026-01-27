import User from "../model/User.js";
import { ApiError } from "../ulits/ApiError.js";
import { ApiResponse } from "../ulits/ApiResponse.js";
import { asynceHandler } from "../ulits/asyncHandler.js";



const generateUserInfoObject = (username, email, id, __v) => {
    return {
        username: username,
        email: email,
        _id: id,
        __v: __v
    }
}


const generateToken = async (user) => {
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save()
    return { accessToken, refreshToken }
}

const generateTokenOption = (tokenType) => {
    const accessTokenExpireAge = 15 * 60 * 1000;
    const refreshTokenExpireAge = 30 * 24 * 60 * 60 * 1000
    return {
        secure: true,
        httpOnly: true,
        maxAge: tokenType === "access" ? accessTokenExpireAge : refreshTokenExpireAge
    }
}

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

    const user = generateUserInfoObject(createdUser.username, createdUser.email, createdUser._id, createdUser.__v)

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


    const loogedInUser = generateUserInfoObject(user.username, user.email, user._id, user.__v)

    if (!isCorrectPassword) {
        throw new ApiError(401, "Unauthorize Access")
    }

    const { accessToken, refreshToken } = await generateToken(user);


    res
        .status(200)
        .cookie("accessToken", accessToken, generateTokenOption("access"))
        .cookie("refreshToken", refreshToken, generateTokenOption("refresh"))
        .json(
            new ApiResponse(
                200,
                { user: loogedInUser },
                "Log in successfull"
            )
        )

})


export const handleUserLogout = asynceHandler(async (req, res) => {

    const x = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: "",
            }
        },
        {
            new: true
        }
    )
    console.log(x)

    res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(
            new ApiResponse(
                200,
                {},
                "Logout successfull"
            )
        )
})