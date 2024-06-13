import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const validateToken = (req, res, next)=>{
    //verifica  si tiene el token
    const {token} = req.cookies
    if(!token) return res.status(401).json({message: "no estas autenticado"})

    //verifica el token y trae los datos del usuario
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=>{
        if(err) return res.status(403).json({message: "Token invalido"});
        
        req.user = decodedToken; // Guarda todo el decodedToken en req.user

        next()
    })
}

//verifica que coincida el id del usuario con el token que inicio sesion
export const verifyUser = (req, res, next)=>{
    // Primero verifica el token
    validateToken(req, res, next, ()=>{
        // Luego verifica si el ID del token de las cookies coincide con el ID del parámetro de la solicitud o si es administrador
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return res.status(403).json({message: "No estas autorizado"});
        }
    })
}

//verifica el token que sea admin
export const verifyAdmin = (req, res, next)=>{
    // Primero verifica el token
    validateToken(req, res, ()=>{
        // verifica si es admin
        if(req.user.isAdmin){
            next()
        }else{
            return res.status(403).json({message: "No estas autorizado"});
        }
    })
}