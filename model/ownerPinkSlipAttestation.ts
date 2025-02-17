import mongoose from "mongoose"

const OwnerPinkSlipAttestationSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        invoice: {
            type: String,
            required: true,
        },
        ownerPinkSlipAttestationID: {
            type: String,
            required: true,
        },
        hirePurchaseAttestationID: {
            type: String,
            required: true,
        },
        vin: {
            type: String,
            required: true,
            unique: true,
        },
        make: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        licensePlate: {
            type: String,
            required: true,
        },
        visualProof: {
            type: [String],
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