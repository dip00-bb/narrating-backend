import { Router } from "express";
import { handleCreateDraft, handleDislikeBlog, handleLikeBlog, handlePublishBlog } from "../controller/blog.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { validator } from "../middlewares/validationMiddleware.js";
import { blogSchema } from "../schemas/blogSchema.js";

const router=Router()

router.post('/create-draft-blog',verifyUser(),validator(blogSchema), handleCreateDraft)

router.post('/publish-blog/:id',handlePublishBlog)

router.post('/like-blog/:id', handleLikeBlog)

router.post('/dislike-blog/:id', handleDislikeBlog)

export default router