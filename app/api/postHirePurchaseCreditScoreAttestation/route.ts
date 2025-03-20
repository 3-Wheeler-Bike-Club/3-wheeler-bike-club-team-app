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
    
    const { address, hirePurchaseAttestationID, hirePurchaseCreditScoreAttestationID, score, paidWeeks } = await req.json()

    try {
        await connectDB()
        const memberCreditScoreAttestation = await MemberCreditScoreAttestation.findOneAndUpdate({ 
            address: address, 
        }, {
            hirePurchaseAttestationID: hirePurchaseAttestationID,
            hirePurchaseCreditScoreAttestationID: hirePurchaseCreditScoreAttestationID,
            score: score,
            paidWeeks: paidWeeks
        }, {
            new: true
        })
        return new Response(JSON.stringify(memberCreditScoreAttestation))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}