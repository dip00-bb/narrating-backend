import { model, Schema } from "mongoose";

const commentSchema = new Schema({

    author: {
        type: String,
        require: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    comment: {
        type: Schema.Types.Mixed,
        require: true
    },

    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        require: true
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
