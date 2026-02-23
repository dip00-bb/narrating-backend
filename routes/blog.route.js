import { Router } from "express";
import { handleCreateNewBlog, handleDislikeBlog, handleLikeBlog } from "../controller/blog.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router=Router()

router.post('/create-new-blog',verifyUser(), handleCreateNewBlog)
router.post('/like-blog/:id', handleLikeBlog)
router.post('/dislike-blog/:id', handleDislikeBlog)
export default router