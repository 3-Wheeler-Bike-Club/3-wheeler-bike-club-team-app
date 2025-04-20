// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cashramp from "@/model/cashramp"
import connectDB from "@/utils/db/mongodb"
import { middleware } from "@/utils/middleware"

export async function POST(
    req: Request,
) {
    const authResponse = middleware(req)
    if (authResponse.status !== 200) {
        return authResponse
    }

    const { address, reference, hostedLink, id, status } = await req.json()
    
    try {
        await connectDB()
        const cashramp = await Cashramp.create({ 
            address: address,
            reference: reference,
            hostedLink: hostedLink,
            id: id, 
            status: status 
        })
        return new Response(JSON.stringify(cashramp))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}