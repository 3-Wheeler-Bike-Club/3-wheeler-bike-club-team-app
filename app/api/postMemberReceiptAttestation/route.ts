// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MemberReceiptAttestation from "@/model/memberReceiptAttestation";
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";


export  async function POST(
    req: Request,
) {
    
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { address, invoiceSchemaID, receiptSchemaID, amount, currency, week, score } = await req.json()

    try {
        await connectDB()
        const memberReceiptAttestation = await MemberReceiptAttestation.create({ 
            address: address, 
            invoiceSchemaID: invoiceSchemaID,
            receiptSchemaID: receiptSchemaID,
            amount: amount,
            currency: currency,
            week: week,
            score: score
        })
        return new Response(JSON.stringify(memberReceiptAttestation))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}