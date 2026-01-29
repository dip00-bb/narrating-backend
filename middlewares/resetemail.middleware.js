import User from "../model/User.js";

const sendResetEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email })

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        const { resetPassToken } = await generateResetPassToken(user)

        sendMail(email, "Reset Your Password", resetPassToken, transporter)

        next()
    } catch (error) {
        res
            .status(500)
            .json( error?.message || "Can Not Send Email Plesae Try Again" )
    }
}