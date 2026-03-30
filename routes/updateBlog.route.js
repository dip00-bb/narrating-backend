import { Router } from "express";
import { handlePublishUpdatedBlog, handleUpdateBlog } from "../controller/updateBlog.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
const router = Router()


router.post('/publish-updated-blog/:id',verifyUser(),handlePublishUpdatedBlog)

router.patch('/update-blog/:id',verifyUser(),handleUpdateBlog)

export default router