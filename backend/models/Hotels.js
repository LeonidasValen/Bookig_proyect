import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            requierd: true,
        },
        type: {
            type: String,
            requierd: true,
        },
        city: {
            type: String,
            requierd: true,
        },
        address: {
            type: String,
            requierd: true,
        },
        distance: {
            type: String,
            requierd: true,
        },
        photos: {
            type: [String],//guarda varios string o elemntos del array
        },
        title: {
            type: String,
            requierd: true,
        },
        desc: {
            type: String,
            requierd: true,
        },
        rating: {
            type: Number,
            min: 0,
            max: 10
        },
        rooms: {
            type: [String],
        },
        cheapestPrice: {
            type: Number,
            requierd: true,
        },
        features: {
            type: Boolean,
            requierd: true,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Hotels", HotelSchema);