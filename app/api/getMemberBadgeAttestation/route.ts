// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MemberBadgeAttestation from "@/model/memberBadgeAttestation";
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";


export  async function POST(
    req: Request,
) {
    
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { address } = await req.json()

    try {
        await connectDB()
        const memberBadgeAttestation = await MemberBadgeAttestation.findOne({ 
            address: address, 
        })
        return new Response(JSON.stringify(memberBadgeAttestation))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}