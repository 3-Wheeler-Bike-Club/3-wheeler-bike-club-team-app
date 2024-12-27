import CurrencyRate from "@/model/currencyRate";
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";

export async function POST(
    req: Request,
) {
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }

    const { currency } = await req.json();

    // Validate input
    if (!currency) {
        return new Response(
            JSON.stringify({
                error: "Currency parameter is required",
            }),
            { status: 400 }
        );
    }

    try {
        await connectDB();
        const currencyRate = await CurrencyRate.findOne({ currency: currency });

        if (!currencyRate) {
            return new Response(
                JSON.stringify({
                    error: "Currency rate not found",
                }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify(currencyRate),
            { status: 200 }
        );
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
