import mongoose from "mongoose"

const CurrencyRateSchema = new mongoose.Schema({
    currency: {
        type: String,
        unique: true,
        required: true,
    },
    rate: {
        type: String,
        required: true,
    }
})

const CurrencyRate = mongoose.models.CurrencyRate || mongoose.model("CurrencyRate", CurrencyRateSchema)

export default CurrencyRate