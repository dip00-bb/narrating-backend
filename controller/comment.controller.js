import Comment from "../model/Comment.js";
import User from "../model/User.js";
import { ApiError } from "../ulits/ApiError.js";
import { ApiResponse } from "../ulits/ApiResponse.js";
import { asynceHandler } from "../ulits/asyncHandler.js";

export const handleAddComment = asynceHandler(async (req, res) => {
    const { id } = req.params
    const {content}=req.body

    if(!content){
        throw new ApiError(400,"Content Field Can't be Empty")
    }

    const commentorId = req.user.id

    const commentor = await User.findById(commentorId, { username: 1, _id: 1 })


    await Comment.create({
        author:commentor.username,
        authorId:commentor._id,
        blogId:id,
        comment:content,
        replideTo:null

    })

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Comment added Successfully"
            )
        )

})


