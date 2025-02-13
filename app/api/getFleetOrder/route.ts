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

    const { invoice } = await req.json();

    try {
        await connectDB();
        const fleetOrder = await FleetOrder.findOne({invoice: invoice});

        if (!fleetOrder) {
            return new Response(
                JSON.stringify({
                    error: "Fleet order not found",
                }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify(fleetOrder),
            { status: 200 }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Failed to fetch fleet orders",
                details: error
            }),
            { status: 500 }
        );

    }
}
