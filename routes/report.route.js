import { Router } from "express";
import { handleCreateReport } from "../controller/reportBlog.controller.js";

const router = Router()

router.post('/report-blog/:blogId', handleCreateReport)
export default router