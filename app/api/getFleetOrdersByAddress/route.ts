import FleetOrder from "@/model/fleetOrder";
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";


export async function POST(
    req: Request,
) {
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }

    const { address } = await req.json();

    // Validate input
    if (!address) {
        return new Response(
            JSON.stringify({
                error: "Address parameter is required",
            }),
            { status: 400 }
        );
    }


    try {
        await connectDB();
        const fleetOrders = await FleetOrder.find({ address: address });


        if (!fleetOrders) {
            return new Response(
                JSON.stringify({
                    error: "Fleet orders not found for this address",
                }),
                { status: 404 }
            );
        }


        return new Response(
            JSON.stringify(fleetOrders),
            { status: 200 }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Failed to fetch fleet orders for this address",
                details: error
            }),
            { status: 500 }
        );

    }
}
