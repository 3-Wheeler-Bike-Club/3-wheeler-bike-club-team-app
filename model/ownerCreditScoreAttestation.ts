import mongoose from "mongoose"

const OwnerCreditScoreAttestationSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        memberBadgeAttestationID: {
            type: String,
            required: true,
        },
        ownerCreditScoreAttestationID: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        weeksActive: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true, // Add timestamps
    }
)

const OwnerCreditScoreAttestation = mongoose.models.OwnerCreditScoreAttestation || mongoose.model("OwnerCreditScoreAttestation", OwnerCreditScoreAttestationSchema)

export default OwnerCreditScoreAttestation