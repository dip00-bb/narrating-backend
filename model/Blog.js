import { Schema } from "mongoose";

const blogSchema = new Schema({
    creatotId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: Schema.Types.Mixed,
        require: true
    }
})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog