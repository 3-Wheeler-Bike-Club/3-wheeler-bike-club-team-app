import mongoose from "mongoose"

const HirePurchaseReceiptAttestationSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        hirePurchaseInvoiceAttestationID: {
            type: String,
            required: true,
        },
        hirePurchaseReceiptAttestationID: {
            type: String,
            required: true,
        },
        vin: {
            type: String,
            required: true,
        },
        receiptID: {
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
        score: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true, // Add timestamps
    }
)

const HirePurchaseReceiptAttestation = mongoose.models.HirePurchaseReceiptAttestation || mongoose.model("HirePurchaseReceiptAttestation", HirePurchaseReceiptAttestationSchema)

export default HirePurchaseReceiptAttestation



