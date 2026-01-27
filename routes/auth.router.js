import { Router } from "express";
import { handleRegisterUser, handleUserLogin } from "../controller/auth.controller.js";
import { validator } from "../middlewares/validationMiddleware.js";
import { userLoginSchema, userRegisterSchema } from "../schemas/userSechema.js";

const router = Router()

router.post('/register', validator(userRegisterSchema), handleRegisterUser)
router.post('/login', validator(userLoginSchema), handleUserLogin)
export default router