import mongoose from "mongoose"

const ThreeWheelBikerSchema = new mongoose.Schema({
    address: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    first: {
        type: String,
        unique: true,
        required: true,

    },
    last: {
        type: String,
        unique: true,
        required: true,

    },
    country: {
        type: String,
        unique: true,
        required: true,

    },
})

const ThreeWheelBiker = mongoose.models.ThreeWheelBiker || mongoose.model("ThreeWheelBiker", ThreeWheelBikerSchema)

export default ThreeWheelBiker