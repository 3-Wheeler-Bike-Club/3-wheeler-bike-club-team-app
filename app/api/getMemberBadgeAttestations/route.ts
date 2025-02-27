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

    try {
        await connectDB()
        const memberBadgeAttestations = await MemberBadgeAttestation.find()
        return new Response(JSON.stringify(memberBadgeAttestations))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}