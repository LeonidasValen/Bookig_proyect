import {Router} from "express"
import { verifyUser } from "../libs/validateJWT.js"
import { validateId } from "../middlewares/validateId.js"
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom } from "../controllers/room.js"

const router = Router()

//POST
router.post('/room/:hotelId', verifyUser, createRoom)
//GETALL
router.get('/room', verifyUser, getAllRooms)
//GET
router.get('/room/:id', verifyUser, validateId, getRoom)
//UPDATE
router.put('/room/:id/:hotelId', verifyUser, validateId, updateRoom)
//DELETE
router.delete('/room/:id/:hotelId', verifyUser, validateId, deleteRoom)

export default router