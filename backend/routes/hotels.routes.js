import {Router} from "express"
import { validateId } from "../middlewares/validateId.js"
import { verifyUser } from "../libs/validateJWT.js"
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controllers/hotel.js"

const router = Router()

//CREATE
router.post('/hotel', verifyUser, createHotel)
//GETALL
router.get('/hotel', getAllHotel)
//GET contador de hoteles por ciudad
router.get('/hotel/countByCity', countByCity)
//contador tipos de alojamientos
router.get('/hotel/countByType', countByType)
//GET
router.get('/hotel/:id', validateId, getHotel)
//UPDATE
router.put('/hotel/:id', verifyUser, validateId, updateHotel)
//DELETE
router.delete('/hotel/:id', verifyUser, validateId, deleteHotel)

export default router