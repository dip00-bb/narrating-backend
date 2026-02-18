import { Router } from "express";
import { handleCreateNewBlog } from "../controller/blog.controller.js";

const router=Router()

router.post('/create-new-blog',handleCreateNewBlog)

export default router