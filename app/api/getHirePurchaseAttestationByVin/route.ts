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
    
    const { vin } = await req.json()

    try {
        await connectDB()
        const hirePurchaseAttestation = await HirePurchaseAttestation.findOne({ 
            vin: vin, 
        })
        return new Response(JSON.stringify(hirePurchaseAttestation))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}