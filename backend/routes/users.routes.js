import {Router} from "express"
import {verifyAdmin, verifyUser } from '../libs/validateJWT.js'
import { validateId } from "../middlewares/validateId.js"
import { deleteUser, getAllUser, getUser, updateUser } from '../controllers/user.js'

const router = Router()

router.put("/updateUser/:id", verifyUser, validateId, updateUser)
router.delete("/deleteUser/:id", verifyUser, validateId, deleteUser)
router.get("/user/:id", verifyUser, validateId, getUser)
router.get("/users", verifyAdmin, getAllUser)

export default router