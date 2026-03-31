import { Router } from "express";
import { handleCreateDraft, handleDeleteBlog, handleDislikeBlog, handleLikeBlog, handlePublishBlog, handleUpdateInDraft } from "../controller/blog.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { validator } from "../middlewares/validationMiddleware.js";
import { blogSchema } from "../schemas/blogSchema.js";
const router=Router()

router.post('/create-draft-blog',verifyUser(),validator(blogSchema), handleCreateDraft)

router.patch('/update-draft/:id',verifyUser(),validator(blogSchema),handleUpdateInDraft)

router.post('/publish-blog/:id',verifyUser(),handlePublishBlog)

router.post('/like-blog/:id', handleLikeBlog)

router.post('/dislike-blog/:id', handleDislikeBlog)

router.delete('/delete-blog/:id', verifyUser(), handleDeleteBlog)
export default router