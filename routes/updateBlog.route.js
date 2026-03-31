import { Router } from "express";
import { handleDeleteUpdatableDraft, handlePublishUpdatedBlog, handleUpdateBlog } from "../controller/updateBlog.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
const router = Router()


router.post('/publish-updated-blog/:id', verifyUser(), handlePublishUpdatedBlog)

router.patch('/update-blog/:id', verifyUser(), handleUpdateBlog)

router.delete('/delete-updatable-draft/:id', verifyUser(), handleDeleteUpdatableDraft)

export default router