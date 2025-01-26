// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MemberCreditScoreAttestation from "@/model/memberCreditScoreAttestation";
import connectDB from "@/utils/db/mongodb"
import { middleware } from "@/utils/middleware"


export async function POST(
    req: Request,
) {
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    try {
        await connectDB()
        const membersCreditScoreAttestations = await MemberCreditScoreAttestation.find()

        return new Response(JSON.stringify(membersCreditScoreAttestations));
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}