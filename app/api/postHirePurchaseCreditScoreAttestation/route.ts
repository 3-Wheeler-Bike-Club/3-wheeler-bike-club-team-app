// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import HirePurchaseCreditScoreAttestation from "@/model/hirePurchaseCreditScoreAttestation";
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";


export  async function POST(
    req: Request,
) {
    
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { address, hirePurchaseAttestationID, hirePurchaseCreditScoreAttestationID, score, paidWeeks, invoicedWeeks } = await req.json()

    try {
        await connectDB()
        const hirePurchaseCreditScoreAttestation = await HirePurchaseCreditScoreAttestation.findOneAndUpdate({ 
            address: address, 
        }, {
            hirePurchaseAttestationID: hirePurchaseAttestationID,
            hirePurchaseCreditScoreAttestationID: hirePurchaseCreditScoreAttestationID,
            score: score,
            paidWeeks: paidWeeks,
            invoicedWeeks: invoicedWeeks
        }, {
            new: true,
            upsert: true // This will create a new document if none exists
        })
        return new Response(JSON.stringify(hirePurchaseCreditScoreAttestation))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}