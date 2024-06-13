import {Router} from 'express'
import { login, logoutUser, register } from '../controllers/auth.js'

const router = Router()

router.post("/registerUser", register)
router.post("/loginUser", login)
router.post("/loginUser", logoutUser)

export default router