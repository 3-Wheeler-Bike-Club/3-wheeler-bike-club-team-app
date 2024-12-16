import mongoose from "mongoose"
const { Schema } = mongoose

const InvoiceAttestationSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        invoiceSchemaID: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true, // Add timestamps
    }
)

const InvoiceAttestation = mongoose.models.InvoiceAttestation || mongoose.model("InvoiceAttestation", InvoiceAttestationSchema)

export default InvoiceAttestation