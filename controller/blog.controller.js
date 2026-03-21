import Model from "../model/Blog.js";
import { ApiError } from "../ulits/ApiError.js";
import { ApiResponse } from "../ulits/ApiResponse.js"
import { asyncHandler } from "../ulits/asyncHandler.js"

export const handleCreateDraft = asyncHandler(async (req, res) => {
    const { content, coverImage, title } = req.body;

    await Model.Draft.create({
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
                {},
                "Blog Created Successfully"
            )
        )
})


export const handlePublishBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // find the blog in draft collection with publishable blog id
    const publishedBlog = await Model.Draft.findOne({ _id: id })

    // throw error if blog not exist 
    if(!publishedBlog){
        throw new ApiError(404,"No Blog Found")
    }

    // convert mongoose doc into plain object
    const blogData=publishedBlog.toObject()

    //remove id for prevent duplicate id error
    delete blogData._id 

    
    const blog= await Model.Blog.create(blogData)

    if(!blog){
        throw new ApiError(400,"Can not create blog. Try Again")
    }

    // delete the blog after save it in the blog collection

   await Model.Draft.deleteOne(
        {
            _id:id
        }
    )


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


