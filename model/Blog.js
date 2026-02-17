import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    creatotId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog