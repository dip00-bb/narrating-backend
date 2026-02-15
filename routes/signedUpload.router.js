import { Router } from "express";
import { handleVerifySignedUpload } from "../controller/signedUpload.controller.js";

const router=Router()

router.post('/signature',handleVerifySignedUpload)

export default router