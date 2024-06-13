import mongoose from 'mongoose'

//define el el modelo del esquema o la base de datos con los datos a guardar
const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,//es requerido un dato
    },
    price:{
        type: Number,
        required: true,
    },
    maxPeople:{
        type: Number,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    roomsNumbers: [{number: Number, unavailableDates:[{type: [Date]}]}],
},{
    timestamps: true//guarda la fecha que se registro el usuario
})

//para poder hacer consultas a la base de datos  pasando como parametro Users
export default mongoose.model('Room', roomSchema)