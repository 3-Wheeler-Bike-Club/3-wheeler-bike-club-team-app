import mongoose from "mongoose"

const MemberReceiptAttestationSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        memberInvoiceAttestationID: {
            type: String,
            required: true,
        },
        memberReceiptAttestationID: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        week: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true, // Add timestamps
    }
)

const MemberReceiptAttestation = mongoose.models.MemberReceiptAttestation || mongoose.model("MemberReceiptAttestation", MemberReceiptAttestationSchema)

export default MemberReceiptAttestation