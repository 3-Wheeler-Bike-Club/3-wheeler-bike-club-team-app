// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import HirePurchaseReceiptAttestation from "@/model/hirePurchaseReceiptAttestation";
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";


export  async function POST(
    req: Request,
) {
    
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { address, hirePurchaseInvoiceAttestationID, hirePurchaseReceiptAttestationID, vin, receiptID, amount, currency, score } = await req.json()

    try {
        await connectDB()
        const hirePurchaseReceiptAttestation = await HirePurchaseReceiptAttestation.create({ 
            address: address, 
            hirePurchaseInvoiceAttestationID: hirePurchaseInvoiceAttestationID,
            hirePurchaseReceiptAttestationID: hirePurchaseReceiptAttestationID,
            vin: vin,
            receiptID: receiptID,
            amount: amount,
            currency: currency,
            score: score,
        })
        return new Response(JSON.stringify(hirePurchaseReceiptAttestation))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}