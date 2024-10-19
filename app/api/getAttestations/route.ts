// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Attestation from "@/model/attestation";
import connectDB from "@/utils/db/mongodb"

import { middleware } from "@/utils/middleware"


export async function POST(
    req: Request,
) {
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    const { address } = await req.json()
    try {

        await connectDB()
        const attestations = await Attestation.find({ address: address })

        return new Response(JSON.stringify(attestations));
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}