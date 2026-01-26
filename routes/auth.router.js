import { Router } from "express";
import { handleRegisterUser } from "../controller/auth.controller.js";
import { validator } from "../middlewares/validationMiddleware.js";
import { userRegisterSchema } from "../schemas/userSechema.js";

const router = Router()

router.post('/register', validator(userRegisterSchema), handleRegisterUser)

export default router