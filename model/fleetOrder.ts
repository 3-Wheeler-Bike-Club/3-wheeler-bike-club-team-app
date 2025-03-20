import mongoose from "mongoose"

const FleetOrderSchema = new mongoose.Schema({
    
    address: {
        type: String,
        required: true,

    },
    invoice: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },

    tender: {
        type: String,
        required: true,
    },
    reference: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        enum: [0, 1, 2, 99],
        default: 0,
        required: true,
    },
    ownerPinkSlipAttestationID: {
        type: [String],
        required: true,
    },
    

},
{
    timestamps: true, // Add timestamps
})

const FleetOrder = mongoose.models.FleetOrder || mongoose.model("FleetOrder", FleetOrderSchema)

export default FleetOrder