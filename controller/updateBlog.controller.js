import Updatable from "../model/UpdatableBlog.js";
import Model from "../model/Blog.js"
import { asyncHandler } from "../ulits/asyncHandler.js";
import { ApiError } from "../ulits/ApiError.js";
import { ApiResponse } from "../ulits/ApiResponse.js";
import { checkDocumentExist, editorAndAuthorNotSame } from "../ulits/customRestError.js";

export const handleStageUpUpdateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    let targetedBlog


    const selectedBlog = await checkDocumentExist(Model.Blog, { _id: id })

    if (!selectedBlog) {
        throw new ApiError(404, "Blog not found")
    }

    editorAndAuthorNotSame(selectedBlog.creatorId, req.user._id)

    targetedBlog = await checkDocumentExist(Updatable, { updatableBlogId: id })

    if (!targetedBlog) {
        targetedBlog = {
            "_id": selectedBlog._id,
            "title": selectedBlog.title,
            "coverImage": selectedBlog.coverImage,
            "content": selectedBlog.content
        }
    }

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                targetedBlog, // send it to the user
                "Blog Created Successfully"
            )
        )
})