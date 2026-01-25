import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: string,
        required: true
    },
    email: {
        type: string,
        required: true
    },
    password: {
        type: string,
        required: true
    },
    profileImage: {
        type: string,

    },
    coverImage: {
        type: string,
    },
    refreshToken: {
        type: string
    }
})

const User = mongoose.model("User", userSchema)

export default User