// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/utils/db/mongodb";
import Attestation from "@/model/attestation";
import { middleware } from "@/utils/middleware";


export  async function POST(
    req: Request,
) {
    
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { address, week, UID } = await req.json()

    try {
        await connectDB()
        const attestation = await Attestation.create({ 
            address: address, 
            week: week,
            UID: UID
        })
        return new Response(JSON.stringify(attestation))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}