// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import OwnerPinkSlipAttestation from "@/model/ownerPinkSlipAttestation";
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";

export async function POST(
    req: Request,
) {
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const {  vin, hirePurchaseAttestationID, ownerPinkSlipAttestationID } = await req.json();
    
    try {
        await connectDB();

        
        const ownerPinkSlipAttestation = await OwnerPinkSlipAttestation.findOneAndUpdate(
            { vin: vin },
            { 
                hirePurchaseAttestationID: hirePurchaseAttestationID,
                ownerPinkSlipAttestationID: ownerPinkSlipAttestationID,
            },
            { new: true }
        );
        return new Response(JSON.stringify(ownerPinkSlipAttestation));
        
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}