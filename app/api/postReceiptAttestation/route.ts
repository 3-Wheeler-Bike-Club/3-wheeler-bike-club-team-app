// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ReceiptAttestation from "@/model/receiptAttestation";
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";


export  async function POST(
    req: Request,
) {
    
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { address, receiptSchemaID } = await req.json()

    try {
        await connectDB()
        const receiptAttestation = await ReceiptAttestation.create({ 
            address: address, 
            receiptSchemaID: receiptSchemaID
        })
        return new Response(JSON.stringify(receiptAttestation))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}