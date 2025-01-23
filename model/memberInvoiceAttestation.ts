import mongoose from "mongoose"

const MemberInvoiceAttestationSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        memberInvoiceAttestationID: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        week: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true, // Add timestamps
    }
)

const MemberInvoiceAttestation = mongoose.models.MemberInvoiceAttestation || mongoose.model("MemberInvoiceAttestation", MemberInvoiceAttestationSchema)

export default MemberInvoiceAttestation