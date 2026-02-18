import { model, Schema } from "mongoose"


const blogSchema = new Schema({
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    coverImage:{
        type:String,
        required:true
    },
    content: {
        type: Schema.Types.Mixed,
        required: true
    }
},{
    timestamps:true
})

const Blog = model("Blog", blogSchema)

export default Blog