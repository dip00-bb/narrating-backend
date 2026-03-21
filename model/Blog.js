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
    totalLikes:{
        type:Number,
        default:0
    },
    totalComment:{
        type:Number,
        default:0
    },
    comments:{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    },
    totalViews:{
        type:Number
    },
    content: {
        type: Schema.Types.Mixed,
        required: true
    },
    status:{
        type: String,
        required:true,
        enum:['approved','suspended','editing']
    }
},{
    timestamps:true
})

const Blog = model("Blog", blogSchema);
const Draft=model("Draft",blogSchema)
const Updatable=model("Updatable",blogSchema)

export default {Blog,Draft,Updatable}
