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
    
    const { currencies, rates } = await req.json();

    // Validate input
    if (!currencies || !rates || !Array.isArray(currencies) || !Array.isArray(rates)) {
        return new Response(
            JSON.stringify({
                error: "Currencies and rates arrays are required",
            }),
            { status: 400 }
        );
    }

    // Validate arrays have same length
    if (currencies.length !== rates.length) {
        return new Response(
            JSON.stringify({
                error: "Currencies and rates arrays must have the same length",
            }),
            { status: 400 }
        );
    }

    try {
        await connectDB();
        
        // Process all updates
        const updates = await Promise.all(
            currencies.map((currency, index) =>
                CurrencyRate.findOneAndUpdate(
                    { currency },
                    { rate: rates[index] },
                    { new: true, upsert: true }
                )
            )
        );

        return new Response(
            JSON.stringify({
                message: "Currency rates updated successfully",
                data: updates
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Failed to update currency rates",
                details: error
            }),
            { status: 500 }
        );
    }
}
