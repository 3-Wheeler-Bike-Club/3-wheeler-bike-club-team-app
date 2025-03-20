import mongoose from "mongoose"

const HirePurchaseAttestationSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        memberBadgeAttestationID: {
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
        },
        amount: {
            type: Number,
            required: true,
        },
        installments: {
            type: Number,
            required: true,
        },
        firstDate: {
            type: Date,
            required: true,
        },
        lastDate: {
            type: Date,
            required: true,
        },
        contract: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true, // Add timestamps
    }
)

const HirePurchaseAttestation = mongoose.models.HirePurchaseAttestation || mongoose.model("HirePurchaseAttestation", HirePurchaseAttestationSchema)

export default HirePurchaseAttestation
