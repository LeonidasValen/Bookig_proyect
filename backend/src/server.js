import { connect } from "../db/db.js";
import app from "./app.js";
import authRouter from '../routes/auth.routes.js'
import hotelRouters from '../routes/hotels.routes.js'
import roomsRouters from "../routes/rooms.routes.js";
import usersRouters from "../routes/users.routes.js";

connect()

//rutas
app.use("/api", authRouter)
app.use("/api", hotelRouters)
app.use("/api", roomsRouters)
app.use("/api", usersRouters)

app.listen(8800, ()=>{
    console.log(`Server corriendo en: http://localhost:8800`)
})

// si funciona el backend te da una bienvenida
app.get("/", (req, res) => {
    res.json("¡Bienvenido al backend!");
});