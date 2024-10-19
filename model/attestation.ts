import mongoose from "mongoose"
import { unique } from "viem/chains"
const { Schema } = mongoose

const AttestationSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        UID: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true, // Add timestamps
    }
)

const Attestation = mongoose.models.Attestation || mongoose.model("Attestation", AttestationSchema)

export default Attestation