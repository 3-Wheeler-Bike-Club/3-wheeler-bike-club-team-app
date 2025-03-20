import mongoose from "mongoose"

const HirePurchaseInvoiceAttestationSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        hirePurchaseAttestationID: {
            type: String,
            required: true,
        },
        hirePurchaseInvoiceAttestationID: {
            type: String,
            required: true,
        },
        vin: {
            type: String,
            required: true,
        },
        invoiceID: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        due: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true, // Add timestamps
    }
)

const HirePurchaseInvoiceAttestation = mongoose.models.HirePurchaseInvoiceAttestation || mongoose.model("HirePurchaseInvoiceAttestation", HirePurchaseInvoiceAttestationSchema)

export default HirePurchaseInvoiceAttestation