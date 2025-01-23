import mongoose from "mongoose"

const OwnerPinkSlipAttestationSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        ownerPinkSlipAttestationID: {
            type: String,
            required: true,
        },
        vin: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        ownerProof: {
            type: String,
            required: true,
        },
        transferProof: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Add timestamps
    }
)   

const OwnerPinkSlipAttestation = mongoose.models.OwnerPinkSlipAttestation || mongoose.model("OwnerPinkSlipAttestation", OwnerPinkSlipAttestationSchema)

export default OwnerPinkSlipAttestation    