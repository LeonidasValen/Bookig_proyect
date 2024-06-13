import mongoose from 'mongoose'

//define el el modelo del esquema o la base de datos con los datos a guardar
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,//es requerido un dato
        trim: true,//elimina los espacios en blanco
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true, //valida que los emails sean unicos y no se repitan
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
},{
    timestamps: true//guarda la fecha que se registro el usuario
})

//para poder hacer consultas a la base de datos  pasando como parametro Users
export default mongoose.model('User', userSchema)