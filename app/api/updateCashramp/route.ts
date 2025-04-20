import Cashramp from "@/model/cashramp"
import connectDB from "@/utils/db/mongodb"
import { middleware } from "@/utils/middleware"

export async function POST(req: Request) {
    const authResponse = middleware(req)
    if (authResponse.status !== 200) {
        return authResponse
    }

    const { reference, status } = await req.json()

    try {
        await connectDB()
        const cashramp = await Cashramp.findOneAndUpdate({ reference }, { status }, { new: true })
        return new Response(JSON.stringify(cashramp), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
    
    
}
        