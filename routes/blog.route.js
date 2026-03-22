import { Router } from "express";
import { handleCreateDraft, handleDislikeBlog, handleLikeBlog, handlePublishBlog, handleUpdateInDraft } from "../controller/blog.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { validator } from "../middlewares/validationMiddleware.js";
import { blogSchema } from "../schemas/blogSchema.js";

const router=Router()

router.post('/create-draft-blog',verifyUser(),validator(blogSchema), handleCreateDraft)

router.patch('/update-in-draft/:id',verifyUser(),validator(blogSchema),handleUpdateInDraft)

router.post('/publish-blog/:id',handlePublishBlog)

router.post('/like-blog/:id', handleLikeBlog)

router.post('/dislike-blog/:id', handleDislikeBlog)

export default router