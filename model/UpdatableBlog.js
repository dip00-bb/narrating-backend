import { model, Schema } from "mongoose";

const updatableBlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    content: {
        type: Schema.Types.Mixed,
        required: true
    },
    updatableBlogId:{
        type:Schema.Types.ObjectId,
        required:true
    }
})

const Updatable = model("Updatable", updatableBlogSchema)
export default Updatable 