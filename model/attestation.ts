import mongoose from "mongoose"
const { Schema } = mongoose

const AttestationSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        week: {
            type: String,
            required: true,
        },
        UID: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true, // Add timestamps
    }
)

const Attestation = mongoose.models.Attestation || mongoose.model("Attestation", AttestationSchema)

export default Attestation