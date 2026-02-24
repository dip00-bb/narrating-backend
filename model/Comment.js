import { model, Schema } from "mongoose";

const commentSchema = new Schema({

    author: {
        type: String,
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comment: {
        type: Schema.Types.Mixed,
        required: true
    },

    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    replideTo: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
},{
    timestamps:true
})

const Comment=model("Comment",commentSchema)
export default Comment
