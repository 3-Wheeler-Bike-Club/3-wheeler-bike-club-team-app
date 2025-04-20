import mongoose from "mongoose"

const CashrampSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    reference: {
        type: String,
        required: true,
        unique: true,
    },
    hostedLink: {
        type: String,
        required: true,
        unique: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
    },

})  

const Cashramp = mongoose.models.Cashramp || mongoose.model("Cashramp", CashrampSchema)

export default Cashramp
