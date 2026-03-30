import { asyncHandler } from "../ulits/asyncHandler.js";
import { ApiError } from "../ulits/ApiError.js";
import { ApiResponse } from "../ulits/ApiResponse.js";
import redis from "../db/redis.js";
import { redisKeys } from "../ulits/redisKeyGenerator.js";
import Blog from "../model/Blog.js";





export const handleUpdateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    const key = redisKeys.updatableBlog(id)
    const updatedContent = req.body

    const stringifiedJson = JSON.stringify({ ...updatedContent, id: id })


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


    const updatedBlogData = await redis.get(updatedBlogKey)

    if (!updatedBlogData) {
        throw new ApiError(404, "Blog not found")
    }



    const parsedUpdatableBlog = JSON.parse(updatedBlogData)


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
    await redis.set(
        targetedKey,
        stringifiedUpdatedBlog,
        "EX",
        2628000,
        "XX"
    );

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