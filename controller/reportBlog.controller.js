import Report from "../model/Report.js"
import { ApiError } from "../ulits/ApiError.js"
import { ApiResponse } from "../ulits/ApiResponse.js"
import { asyncHandler } from "../ulits/asyncHandler.js"

export const handleCreateReport = asyncHandler(async (req, res) => {


    const { reportType, reportContent } = req.body
    const { blogId } = req.params

    if (!reportType) {
        throw new ApiError(400, "Report Type Is Require")
    }

    await Report.create({
        reportType,
        reportContent,
        blogId: blogId
    })

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Report Submitted Successfully"
            )
        )
})


