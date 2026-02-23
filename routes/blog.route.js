import { Router } from "express";
import { handleCreateNewBlog, handleLikeBlog } from "../controller/blog.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router=Router()

router.post('/create-new-blog',verifyUser(), handleCreateNewBlog)
router.post('/like-blog/:id', handleLikeBlog)
export default router