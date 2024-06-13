import Room from "../models/Room.js";
import Hotels from "../models/Hotels.js";

export const createRoom = async(req, res)=>{
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body)
    try {

        const savedRoom = await newRoom.save()
        try {
            // Actualizar el hotel para incluir la nueva habitación en su lista de habitaciones
            await Hotels.findByIdAndUpdate(hotelId, 
            {
                $push: {rooms: savedRoom.id},//el metodo push es para guardar y agregar nuevos elemnetos al arreglo ej: [room1, room2] => [room1, room2, room3] 
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error interno del servidor al agregar las habitaciones"})
        }
        
        res.status(200).json(savedRoom)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error interno del servidor al crear las habitaciones"})
    }
}

//trae todos las habitaciones
export const getAllRooms = async(req, res)=>{
    try {
        const rooms = await Room.find()
        
        res.status(200).json(rooms)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error en el servidor al traer las habitaciones"})
    }
}

//trae el habitacion por su id
export const getRoom = async(req, res)=>{
    try {
        const rooms = await Room.findById(req.params.id)

        if(!rooms) return res.status(404).json({message: "hotel no encontrado"})
        
        res.status(200).json(rooms)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error en el servidor al traer la habitacion"})
    }
}

//actualiza las habitaciones
export const updateRoom = async(req, res)=>{
    try {
        const roomUpdate = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})//new devuelve el documento actualizado y no el original, set es mas seguro para los campos
        
        if(!roomUpdate) return res.status(404).json({message: "La habitacion no fue encontrado"})

        res.status(200).json(roomUpdate)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error en el servidor al actualizar el hotel"})
    }
}

//borra el hotel
export const deleteRoom = async(req, res)=>{
    const hotelId = req.params.hotelId;
    try {
        const roomDelete = await Room.findByIdAndDelete(req.params.id)
        
        if(!roomDelete) return res.status(404).json({message: "La habitacion no fue encontrado"})

        try {
            // Actualizar el hotel para incluir la nueva habitación en su lista de habitaciones
            await Hotels.findByIdAndUpdate(hotelId, 
            {
                $pull: {rooms: req.params.id},//el metodo pull es para eliminar los elemnetos al arreglo ej: [room1, room2, room3]  => [room1, room3] 
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error interno del servidor al agregar las habitaciones"})
        }

        res.status(204).json({message: "Habitacion eliminada"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error en el servidor al eliminar el hotel"})
    }
}