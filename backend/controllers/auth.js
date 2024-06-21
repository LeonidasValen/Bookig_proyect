import Users from "../models/Users.js"
import bcrypt from "bcrypt"
import { createJWT } from "../libs/createJWT.js";

export const register = async(req, res)=>{
    const {username, email, password} = req.body;
    try {
        //valida que no halla un email repetido
        const userFound = await Users.findOne({email})
        if(userFound) return res.status(400).json({message: "El correo ya esta registrado"})
        //genera la encriptacion de la contraeña
        const hashedPass = await bcrypt.hash(password, 10)
        
        const newUser = new Users(
            {
                username, 
                email,
                password: hashedPass, 
            }
        )
        //guarda los datos
        const savedUser = await newUser.save();

        res.status(201).json({message: "Usuario creado exitosamente"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error interno del servidor"})
    }
}

export const login = async(req, res)=>{
    const {email, password} = req.body;
    //console.log(email, password)
    try {
        //busca el correo del usuario
        const userFound = await Users.findOne({email})
        //verifica el correo
        if(!userFound) return res.status(404).json({message: "Correo o contraseña incorrecto"})
        //compara las contraseñas
        const isMatch = await bcrypt.compare(password, userFound.password)
        //verifica la contraseña
        if(!isMatch) return res.status(404).json({message: "Correo o contraseña incorrecto"})

        //llama la funcion de la carpeta libs createJWT
        const token = await createJWT({id: userFound.id, isAdmin: userFound.isAdmin});
        //configura las cookies
        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'none'});

        res.status(201).json({message: "Sesion iniciado exitosamente", token, id: userFound.id, isAdmin: userFound.isAdmin, username: userFound.username})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error interno del servidor"})
    }
}

export const logoutUser = async(req, res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
        res.status(500).json({ error: 'Error al cerrar sesión', message: error.message });
    }
}