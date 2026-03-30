import Model from "../model/Blog.js";
import { ApiError } from "../ulits/ApiError.js";
import { ApiResponse } from "../ulits/ApiResponse.js"
import { asyncHandler } from "../ulits/asyncHandler.js"
import { checkDocumentExist, editorAndAuthorNotSame } from "../ulits/customRestError.js";


export const findDraftBlogAndDeleteId = async (draftModel, id) => {
    const updatedBlog = await draftModel.findOne({ _id: id })
    if (!updatedBlog) {
        throw new ApiError(404, "No Blog Found")
    }

    const blogData = updatedBlog.toObject()

    delete blogData._id

    await draftModel.deleteOne(
        {
            _id: id
        }
    )
    return blogData
}

export const handleCreateDraft = asyncHandler(async (req, res) => {
    const { content, coverImage, title } = req.body;

    const newDraft = await Model.Draft.create({
        creatorId: req.user._id,
        content,
        coverImage,
        title,
        status: "editing"
    })

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    "blogId": newDraft._id
                },
                "Blog Created Successfully"
            )
        )
})

// Try to make it more efficient so that user can able to send this field which he want to update
export const handleUpdateInDraft = asyncHandler(async (req, res) => {
    const { content, coverImage, title } = req.body
    const { id } = req.params

    const updatedBlog = await Model.Draft.findByIdAndUpdate(
        id,
        {
            content,
            coverImage,
            title
        },
        {
            new: true
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


//Todo change ta status before publish
export const handlePublishBlog = (draftModel, updatedModel) =>
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        const updatedBlog = await findDraftBlogAndDeleteId(draftModel, id)


        const blog = await updatedModel.create({
            ...updatedBlog,
            status: "approved" // before save make status approve
        })

        if (!blog) {
            throw new ApiError(400, "Can not create blog. Try Again")
        }

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