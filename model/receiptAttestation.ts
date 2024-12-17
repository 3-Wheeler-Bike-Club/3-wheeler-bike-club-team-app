import mongoose from "mongoose"
const { Schema } = mongoose

const ReceiptAttestationSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        invoiceSchemaID: {
            type: String,
            required: true,
        },
        receiptSchemaID: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true, // Add timestamps
    }
)

const ReceiptAttestation = mongoose.models.ReceiptAttestation || mongoose.model("ReceiptAttestation", ReceiptAttestationSchema)

export default ReceiptAttestation