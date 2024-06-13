import mongoose from "mongoose";

export const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Conectado a MongoDB");
        }catch(error){
            console.error("Error al conectar a MongoDB:", error); // Modificado el mensaje de error
            throw error;
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb esta desconectado")
})
mongoose.connection.on("connected", ()=>{
    console.log("mongodb esta conectado")
})