import { Router } from "express";
import { handleRegisterUser, handleUserLogin, handleUserLogout, resetPassToken } from "../controller/auth.controller.js";
import { validator } from "../middlewares/validationMiddleware.js";
import { userLoginSchema, userRegisterSchema } from "../schemas/userSechema.js";
import { verifyUser } from "../middlewares/auth.middleware.js";



const router = Router()

router.post('/register', validator(userRegisterSchema), handleRegisterUser)
router.post('/login', validator(userLoginSchema), handleUserLogin)
router.post('/logout', verifyUser(), handleUserLogout)
router.post('/resetpass-token', resetPassToken)

export default router