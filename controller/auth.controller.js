import User from "../model/User.js";

export const handleRegisterUser = async (req,res) => {
    // get user details

    // username
    // email
    // password
    // check user already in database or not
    // if yes return already exit 
    // else create new user

    const { username, email, password } = req.body
    console.log(username, email, password)
    res.status(200).json("4444")
}