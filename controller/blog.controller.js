import redis from "../db/redis.js";
import Model from "../model/Blog.js";
import { ApiError } from "../ulits/ApiError.js";
import { ApiResponse } from "../ulits/ApiResponse.js"
import { asyncHandler } from "../ulits/asyncHandler.js"
import { checkDocumentExist, editorAndAuthorNotSame } from "../ulits/customRestError.js";
import { v4 as uuidv4 } from 'uuid';
import { redisKeys, updateExitingString } from "../ulits/redisUtils.js";
import Blog from "../model/Blog.js";



export const handleCreateDraft = asyncHandler(async (req, res) => {
    const { content, coverImage, title } = req.body;

    const uniqueID = uuidv4()
    const key = redisKeys.draftBlog(uniqueID)

    // save all the draft id in list 
    const draftList = redisKeys.draftList(req.user._id)
    await redis.lpush(draftList, uniqueID)

    const upcomingDataInObject = {
        content: content,
        coverImage: coverImage,
        title: title,
    }



    const stringifiedUpcomingData = JSON.stringify(upcomingDataInObject)
    await redis.set(key, stringifiedUpcomingData)
    await redis.expire(key, 5256000)

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    "blogId": uniqueID
                },
                ""
            )
        )
})

export const handleUpdateInDraft = asyncHandler(async (req, res) => {
    const { content, coverImage, title } = req.body
    const { id } = req.params
    const key = redisKeys.draftBlog(id)

    const updatedDataInObject = {
        content: content,
        coverImage: coverImage,
        title: title
    }

    const stringifiedUpdatedData = JSON.stringify(updatedDataInObject)


    await updateExitingString(key, stringifiedUpdatedData, 5256000)

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Blog Updated Successfully"
            )
        )
})

export const handlePublishBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const key = redisKeys.draftBlog(id)
    const draftList = redisKeys.draftList(req.user._id)
    const updatedBlog = await redis.get(key)



    if (!updatedBlog) {
        throw new ApiError(404, "Blog No Found")
    }
    const parsedUpdatedBlog = JSON.parse(updatedBlog)
    console.log(parsedUpdatedBlog)
    const blog = await Blog.create(
        {
            creatorId: req.user._id,
            content: parsedUpdatedBlog.content,
            coverImage: parsedUpdatedBlog.coverImage,
            title: parsedUpdatedBlog.title
        }
    )

    if (!blog) {
        throw new ApiError(400, "Can not create blog. Try Again")
    }



    const publishedBlogPosition = await redis.lpos(draftList, id)

    console.log(publishedBlogPosition)

    await redis.lrem(draftList, publishedBlogPosition, key)
    await redis.del(key)

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                blog,
                "Blog Created Successfully"
            )
        )
})












export const handleLikeBlog = asyncHandler(async (req, res) => {
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
export const handleDislikeBlog = asyncHandler(async (req, res) => {
    const { id } = req.params


    await Blog.updateOne(
        { _id: id },
        {
            $inc: {
                totalLikes: -1
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

export const handleDeleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blog = await checkDocumentExist(Model.Blog, { _id: id });

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    editorAndAuthorNotSame(blog.creatorId, req.user._id);


    await Model.Blog.deleteOne({ _id: id });

    // TODO delete all the related comment of that blog

    const stagedUpBlog = await checkDocumentExist(Updatable, { updatableBlogId: id });

    if (stagedUpBlog) {
        await Updatable.deleteOne({ updatableBlogId: id });
    }


    res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Blog deleted successfully"
        )
    );
});