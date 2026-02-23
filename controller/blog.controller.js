import Blog from "../model/Blog.js";
import { ApiResponse } from "../ulits/ApiResponse.js"
import { asynceHandler } from "../ulits/asyncHandler.js"

export const handleCreateNewBlog = asynceHandler(async (req, res) => {
    const { content, coverImage, title } = req.body;

    await Blog.create({
        creatorId: req.user._id,
        content,
        coverImage,
        title,
    })

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Blog Created Successfully"
            )
        )
})


export const handleLikeBlog = asynceHandler(async (req, res) => {
    const { id } = req.params

    await Blog.updateOne(
        { _id: id },
        {
            $inc: {
                totalLikes: 1
            }
        }
    )

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Like Added"
            )
        )
})


export const handleDislikeBlog = asynceHandler(async (req, res) => {
    const { id } = req.params


    await Blog.updateOne(
        { _id: id },
        {
            $inc: {
                totalLikes: 1
            }
        }
    )

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                ""
            )
        )
})