import Hotels from "../models/Hotels.js"

//crear un nuevo hotel
export const createHotel = async (req, res) => {
    //const {name, type, city, address, distance, photos, title, desc, cheapestPrice, features} =  req.body
    try {
        const newHotel = new Hotels(req.body)

        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor al crear el hotel" })
    }
}

//trae todos los hoteles
export const getAllHotel = async (req, res) => {
    const { city, limit } = req.query;
    try {
        const query = city ? { city: { $regex: city, $options: 'i' } } : {};
        const hotels = await Hotels.find(query).limit(parseInt(limit) || 10);
        res.status(200).json(hotels);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//trae el hotel por su id
export const getHotel = async (req, res) => {
    try {
        const hotels = await Hotels.findById(req.params.id)

        if (!hotels) return res.status(404).json({ message: "hotel no encontrado" })

        res.status(200).json(hotels)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor al traer el hotel" })
    }
}

//actualiza el hotel
export const updateHotel = async (req, res) => {
    try {
        const hotelUpdate = await Hotels.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })//new devuelve el documento actualizado y no el original, set es mas seguro para los campos

        if (!hotelUpdate) return res.status(404).json({ message: "Hotel no encontrado" })

        res.status(200).json(hotelUpdate)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor al actualizar el hotel" })
    }
}

//borra el hotel
export const deleteHotel = async (req, res) => {
    try {
        const hotelDelete = await Hotels.findByIdAndDelete(req.params.id)

        if (!hotelDelete) return res.status(404).json({ message: "Hotel no encontrado" })

        res.status(204).json({ message: "Hotel fue eliminado" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor al eliminar el hotel" })
    }
}

//contador de hoteles por ciudad
export const countByCity = async (req, res) => {
    const cities = req.query.cities.split(",")//el split transforma en un arreglo los datos traidos ej: cities = [berlin,madrid,london]
    try {
        //hacemos manejo de multiples promesas y itera el arreglo de cities y lo guarda como parametro en city
        const list = await Promise.all(cities.map(city => {
            return Hotels.countDocuments({ city: city });//devuelve y cuenta los hoteles con el countDocuments y  verifica que coincidad con la ciudad 
        }))

        res.status(200).json(list)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor al traer los hoteles" })
    }
}

//contador tipos de alojamientos
export const countByType = async (req, res) => {
    try {
        const HotelCount = await Hotels.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotels.countDocuments({ type: "apartment" })
        const resortCount = await Hotels.countDocuments({ type: "resort" })
        const villaCount = await Hotels.countDocuments({ type: "villa" })

        res.status(200).json([
            { type: "hotel", count: HotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
        ])
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor al traer los hoteles" })
    }
}