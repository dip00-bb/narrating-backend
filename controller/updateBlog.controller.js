import Updatable from "../model/UpdatableBlog.js";
import Model from "../model/Blog.js"
import { asyncHandler } from "../ulits/asyncHandler.js";
import { ApiError } from "../ulits/ApiError.js";
import { ApiResponse } from "../ulits/ApiResponse.js";
import { checkDocumentExist, editorAndAuthorNotSame } from "../ulits/customRestError.js";

export const handleStageUpUpdateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    let targetedBlog
    let existInDraft = true;

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

        existInDraft = false
    }

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    "blogInfo": targetedBlog,
                    "existInDraft": existInDraft
                },
                "Blog Created Successfully"
            )
        )
})


export const handleUpdateBlog = asyncHandler(async (req, res) => {
    const { content, coverImage, title } = req.body
    const { id } = req.params
    let updatedBlog;

    updatedBlog = await Updatable.findOneAndUpdate(
        {
            updatableBlogId: id
        },
        {
            content,
            coverImage,
            title
        },
        {
            new: true,
            upsert: true
        }
    )


    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    updatedBlog
                },
                "Blog Updated Successfully"
            )
        )
})


export const handlePublishUpdatedBlog = (draftModel, updatedModel) =>
    asyncHandler(async (req, res) => {

        const { id } = req.params;

        const updatedBlogData = await findDraftBlogAndDeleteId(draftModel, id)

        const updateBlog = await updatedModel.findByIdAndUpdate(
            updatedBlogData.updatableBlogId,
            {
                content: updatedBlogData.content,
                coverImage: updatedBlogData.coverImage,
                title: updatedBlogData.title
            },
            {
                new: true
            }
        )

        if (!updateBlog) {
            throw new ApiError(400, "Can not update blog. Try Again")
        }

        res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    updateBlog,
                    "Blog Created Successfully"
                )
            )
    })