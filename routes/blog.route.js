import { Router } from "express";
import { handleCreateNewBlog } from "../controller/blog.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router=Router()

router.post('/create-new-blog',verifyUser(), handleCreateNewBlog)

export default router