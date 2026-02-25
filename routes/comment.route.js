import { Router } from "express";
import { handleAddComment, handleUpdateComment } from "../controller/comment.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { validator } from "../middlewares/validationMiddleware.js";
import { commentSchema } from "../schemas/commentSchema.js";

const router=Router()

router.post('/create-comment/:id',verifyUser(), validator(commentSchema),handleAddComment)
router.patch('/update-comment/:id',verifyUser(), validator(commentSchema),handleUpdateComment)
export default router
