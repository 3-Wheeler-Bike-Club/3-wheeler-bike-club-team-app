import mongoose from "mongoose"

const MemberCreditScoreAttestationSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
            unique: true,
        },
        hirePurchaseAttestationID: {
            type: String,
            required: true,
        },
        hirePurchaseCreditScoreAttestationID: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        paidWeeks: {
            type: Number,
            required: true,
        },
        invoicedWeeks: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true, // Add timestamps
    }
)   

const MemberCreditScoreAttestation = mongoose.models.MemberCreditScoreAttestation || mongoose.model("MemberCreditScoreAttestation", MemberCreditScoreAttestationSchema)

export default MemberCreditScoreAttestation