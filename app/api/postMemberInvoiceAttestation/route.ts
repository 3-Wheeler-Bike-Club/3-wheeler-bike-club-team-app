// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MemberInvoiceAttestation from "@/model/memberInvoiceAttestation";
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";


export  async function POST(
    req: Request,
) {
    
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { address, memberInvoiceAttestationID, amount, week } = await req.json()

    try {
        await connectDB()
        const memberInvoiceAttestation = await MemberInvoiceAttestation.create({ 
            address: address, 
            memberInvoiceAttestationID: memberInvoiceAttestationID,
            amount: amount,
            week: week
        })
        return new Response(JSON.stringify(memberInvoiceAttestation))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}