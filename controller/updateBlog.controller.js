import { asyncHandler } from "../ulits/asyncHandler.js";
import { ApiError } from "../ulits/ApiError.js";
import { ApiResponse } from "../ulits/ApiResponse.js";
import redis from "../db/redis.js";
import { parseData, redisKeys, updateExitingString } from "../ulits/redisUtils.js";
import Blog from "../model/Blog.js";





export const handleUpdateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    const key = redisKeys.updatableBlog(id)

    const updatedContent = req.body

    const stringifiedJson = JSON.stringify({ ...updatedContent, id: id, creatorId: req.user._id })


    await redis.set(key, stringifiedJson)
    await redis.expire(key, 5256000)


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


export const handlePublishUpdatedBlog = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const updatedBlogKey = redisKeys.updatableBlog(id)


    const parsedUpdatableBlog = await parseData(updatedBlogKey)

    if (!parsedUpdatableBlog) {
        throw new ApiError(404, "Blog not found")
    }

    if (parsedUpdatableBlog.creatorId !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized ! You can not publish updates")
    }



    const updatedBlog = await Blog.findByIdAndUpdate(
        parsedUpdatableBlog.id,
        {
            content: parsedUpdatableBlog.content,
            coverImage: parsedUpdatableBlog.coverImage,
            title: parsedUpdatableBlog.title
        },
        {
            new: true
        }
    )


    if (!updatedBlog) {
        throw new ApiError(400, "Can not update blog. Try Again")
    }



    const targetedKey = redisKeys.blog(id)

    const stringifiedUpdatedBlog = JSON.stringify(updatedBlog)

    // also update in cache if it the same blog are saved saved

    await updateExitingString(targetedKey, stringifiedUpdatedBlog, 2628000)

    await redis.del(updatedBlogKey)

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedBlog,
                "Blog Updated Successfully"
            )
        )
})


export const handleDeleteUpdatableDraft = asyncHandler(async (req, res) => {
    const { id } = req.params
    const deletableUpdatableKey = redisKeys.updatableBlog(id)


    const parsedBlogDeletableBlog = await parseData(deletableUpdatableKey)

    if (!parsedBlogDeletableBlog) {
        throw new ApiError(404, "Blog Not Found")
    }

    if (parsedBlogDeletableBlog.creatorId !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized ! You can not delete Blog")
    }


    await redis.del(deletableUpdatableKey) // remove the draft from updatable draft

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Drafted Blog Deleted Successfully"
            )
        )

})