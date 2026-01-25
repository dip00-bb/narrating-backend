import mongoose from "mongoose";
import bcrypt from "bcrypt"

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

userSchema.pre("save", async function (){
    if(this.isModified("password")){
        this.password=bcrypt.hash(this.password,10)
    }
})

const User = mongoose.model("User", userSchema)

export default User