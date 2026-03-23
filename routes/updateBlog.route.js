import { Router } from "express";
import { handlePublishUpdatedBlog, handleStageUpUpdateBlog, handleUpdateBlog } from "../controller/updateBlog.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import Updatable from "../model/UpdatableBlog.js";
import Model from "../model/Blog.js"
const router = Router()

router.get('/stage-up-update/:id', verifyUser(), handleStageUpUpdateBlog)


router.post('/publish-updated-blog/:id',verifyUser(),handlePublishUpdatedBlog(Updatable,Model.Blog) )

router.patch('/update-blog/:id',verifyUser(),handleUpdateBlog)

export default router