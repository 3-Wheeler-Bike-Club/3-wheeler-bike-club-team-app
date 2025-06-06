// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MemberCreditScoreAttestation from "@/model/memberCreditScoreAttestation";
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";


export  async function POST(
    req: Request,
) {
    
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { address, memberCreditScoreAttestationID, score, paidWeeks, invoicedWeeks } = await req.json()

    try {
        await connectDB()
        const memberCreditScoreAttestation = await MemberCreditScoreAttestation.create({ 
            address: address, 
            memberCreditScoreAttestationID: memberCreditScoreAttestationID,
            score: score,
            paidWeeks: paidWeeks,
            invoicedWeeks: invoicedWeeks
        })
        return new Response(JSON.stringify(memberCreditScoreAttestation))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}