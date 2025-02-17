// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
    
    const { address, invoice, amount, tender, reference, status, ownerPinkSlipAttestationID } = await req.json()

    try {
        await connectDB()

        // If status is not 0 and only status and ownerPinkSlipAttestationID provided, do an update
        if (status !== 0 && 
            status !== undefined && 
            ownerPinkSlipAttestationID !== undefined &&
            !amount && !tender && !reference) {
            
            const fleetOrder = await FleetOrder.findOneAndUpdate(
                { invoice },
                { 
                    status,
                    ownerPinkSlipAttestationID
                },
                { new: true }
            )
            return new Response(JSON.stringify(fleetOrder))
        }

        // Otherwise verify all required fields are present for new order
        if (!address || !invoice || !amount || !tender || !reference || 
            status === undefined || !ownerPinkSlipAttestationID) {
            return new Response(
                JSON.stringify({
                    error: "Missing required fields"
                }),
                { status: 400 }
            )
        }

        // Create new order
        const fleetOrder = await FleetOrder.create({ 
            address,
            invoice,
            amount, 
            tender,
            reference,
            status,
            ownerPinkSlipAttestationID
        })
        return new Response(JSON.stringify(fleetOrder))

    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}