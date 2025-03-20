// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import HirePurchaseAttestation from "@/model/hirePurchaseAttestation";
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";


export  async function POST(
    req: Request,
) {
    
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { address, memberBadgeAttestationID, hirePurchaseAttestationID, vin, amount, installments, firstDate, lastDate, contract } = await req.json()

    try {
        await connectDB()
        const hirePurchaseAttestation = await HirePurchaseAttestation.create({ 
            address: address, 
            memberBadgeAttestationID: memberBadgeAttestationID,
            hirePurchaseAttestationID: hirePurchaseAttestationID,
            vin: vin,
            amount: amount,
            installments: installments,
            firstDate: firstDate,
            lastDate: lastDate,
            contract: contract
        })
        return new Response(JSON.stringify(hirePurchaseAttestation))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}