import { v2 as cloudinary } from "cloudinary"
import { asynceHandler } from "../ulits/asyncHandler.js";
import { ApiResponse } from "../ulits/ApiResponse.js";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const handleVerifySignedUpload = asynceHandler(async (req, res) => {



  const timestamp = Math.round(new Date().getTime() / 1000);


  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: process.env.CLOUDINARY_FOLDER
    },
    process.env.CLOUDINARY_API_SECRET
  )

  const cloudDetails = {
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder: process.env.CLOUDINARY_FOLDER
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      cloudDetails,
      "Registration Sucessfull"
    ))

})
