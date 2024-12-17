// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/utils/db/mongodb"
import { middleware } from "@/utils/middleware";
import ThreeWheelBiker from "@/model/threeWheelBiker";


export async function POST(
    req: Request,
) {
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    const { address, email, first, last, country } =  await req.json()
    try {
        await connectDB()
        const threeWheelBiker = await ThreeWheelBiker.create({ 
            address: address,
            email: email,
            first: first,
            last: last,
            country: country,
        })
        console.log(threeWheelBiker)
        return new Response(JSON.stringify(threeWheelBiker))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}