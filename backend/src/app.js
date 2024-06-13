import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cookieParcer from "cookie-parser"
import cors from "cors"

dotenv.config()

const app = express()

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:4173'],// URL de las paginas que pueda hacer operaciones 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Limita los métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Limita los encabezados permitidos
    credentials: true, // Habilita el uso de credenciales (cookies, encabezados de autorización, etc.)
};

app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParcer())

export default app