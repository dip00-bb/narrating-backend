import Comment from "../model/Comment.js";
import User from "../model/User.js";
import { ApiError } from "../ulits/ApiError.js";
import { ApiResponse } from "../ulits/ApiResponse.js";
import { asynceHandler } from "../ulits/asyncHandler.js";

export const handleAddComment = asynceHandler(async (req, res) => {
    const { blogId } = req.params // blog id
    const { content } = req.body

    if (!content) {
        throw new ApiError(400, "Content Field Can't be Empty")
    }

    const commentorId = req.user.id

    const commentor = await User.findById(commentorId, { username: 1, _id: 1 })


    await Comment.create({
        author: commentor.username,
        authorId: commentor._id,
        blogId: blogId,
        comment: content,
        replideTo: null

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


export const handleUpdateComment = asynceHandler(async (req, res) => {
    const { commentId } = req.params
    const { content } = req.body

    if (!content) {
        throw new ApiError(400, "Content Field Can't be Empty")
    }

    const updatedDocument = await Comment.findByIdAndUpdate(commentId, { comment: content }, { new: true })

    if (!updatedDocument) {
        throw new ApiError(404, "No Comment Found")
    }

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Comment updated Successfully"
            )
        )

})


export const handleDeleteComment = asynceHandler(async (req, res) => {
    const { commentId } = req.params

    if (!commentId) {
        throw new ApiError(400, "Comment Id not found")
    }

    const deletedDocument = await Comment.findByIdAndDelete(commentId)
    if (!deletedDocument) {
        throw new ApiError(404, "No Comment Found")
    }


    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Comment deleted Successfully"
            )
        )

})


export const handleReplayComment = asynceHandler(async (req, res) => {
    const { commentId, blogId } = req.params

    console.log(commentId, blogId)
    const { content } = req.body

    if (!commentId) {
        throw new ApiError(400, "Comment Id not found")
    }
    const replierId = req.user.id
    const replier = await User.findById(replierId, { username: 1, _id: 1 })

    await Comment.create({
        author: replier.username,
        authorId: replier._id,
        comment: content,
        blogId,
        replideTo: commentId
    })

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Replay added Successfully"
            )
        )

})