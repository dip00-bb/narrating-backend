import { Router } from "express";
import { handleChangePassword, handleForgetPassword, handleRefreshToken, handleRegisterUser, handleUserLogin, handleUserLogout, resetPassToken } from "../controller/auth.controller.js";
import { validator } from "../middlewares/validationMiddleware.js";
import { userLoginSchema, userRegisterSchema } from "../schemas/userSechema.js";
import { verifyRefreshToken, verifyUser } from "../middlewares/auth.middleware.js";
import { rateLimiter } from "../middlewares/ratelimit.middleware.js";



const router = Router()

router.post('/register', validator(userRegisterSchema), handleRegisterUser)
router.post('/login', validator(userLoginSchema), handleUserLogin)
router.post('/logout', verifyUser(), handleUserLogout)
router.post('/resetpass-token', rateLimiter(), resetPassToken)
router.post('/forget-password', handleForgetPassword)
router.post('/change-password', verifyUser(), handleChangePassword)
router.post('/refresh-token', verifyRefreshToken(), handleRefreshToken)

export default router