import Users from "../models/Users.js";

export const updateUser = async(req, res)=>{
    try {
        const updateUser = await Users.findByIdAndUpdate(req.params.id, {$set:req.body}, {new: true})

        res.status(201).json({message: "Cuenta actualizada"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error interno del servidor"})
    }
}

export const deleteUser = async(req, res)=>{
    try {
        await Users.findByIdAndDelete(req.params.id);
        res.status(201).json({message: "Cuenta eliminada"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error interno del servidor"})
    }
}

export const getUser = async(req, res)=>{
    try {
        const userFound = await Users.findById(req.params.id);

        if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})

        res.status(201).json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error interno del servidor"})
    }
}

export const getAllUser = async(req, res)=>{
    try {
        const userFound = await Users.find();

        if(!userFound) return res.status(400).json({message: "Usuarios no encontrados"})

        res.status(201).json({userFound});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error interno del servidor"})
    }
}

