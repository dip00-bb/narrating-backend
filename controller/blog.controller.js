import Blog from "../model/Blog.js";
import { ApiResponse } from "../ulits/ApiResponse.js"
import { asynceHandler } from "../ulits/asyncHandler.js"

export const handleCreateNewBlog = asynceHandler(async(req, res)=>{
    const blogData=req.body;

    await Blog.create(blogData)

        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Blog Created Successfully"
            )
        )
} )