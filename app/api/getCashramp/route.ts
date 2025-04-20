import Cashramp from "@/model/cashramp"
import connectDB from "@/utils/db/mongodb"
import { middleware } from "@/utils/middleware"

export async function POST(req: Request) {
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }

    const { reference } = await req.json()

    try {
        await connectDB()
        const cashramp = await Cashramp.findOne({
            reference: reference
        })
        if (!reference) {
            return new Response(
                JSON.stringify({
                    error: "Reference not found",
                }),
                { status: 404 }
            );
        }


        return new Response(JSON.stringify(cashramp), { status: 200 })
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Failed to fetch currency rate",
                details: error
            }),
            { status: 500 }
        );
    }
}                                                   
