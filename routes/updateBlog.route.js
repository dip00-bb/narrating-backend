import { Router } from "express";
import { handleStageUpUpdateBlog } from "../controller/updateBlog.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/stage-up-update/:id', verifyUser(), handleStageUpUpdateBlog)

export default router