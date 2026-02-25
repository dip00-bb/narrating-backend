import { Router } from "express";
import { handleAddComment, handleDeleteComment, handleReplayComment, handleUpdateComment } from "../controller/comment.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { validator } from "../middlewares/validationMiddleware.js";
import { commentSchema } from "../schemas/commentSchema.js";

const router=Router()

router.post('/create-comment/:blogId',verifyUser(), validator(commentSchema),handleAddComment)
router.patch('/update-comment/:commentId',verifyUser(), validator(commentSchema),handleUpdateComment)
router.delete('/delete-comment/:commentId', verifyUser(),handleDeleteComment)
router.post('/replay-comment/:commentId/:blogId',verifyUser(),handleReplayComment)

export default router
