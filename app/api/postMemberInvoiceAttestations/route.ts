// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";
import MemberInvoiceAttestation from "@/model/memberInvoiceAttestation";


export  async function POST(
    req: Request,
) {
    
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { addresses, memberInvoiceAttestationIDs, amount, week } = await req.json()

    // Validate input
    if (!Array.isArray(addresses) || !Array.isArray(memberInvoiceAttestationIDs)) {
        return new Response(
            JSON.stringify({
                error: "`addresses` and `memberInvoiceAttestationID` must both be arrays.",
            }),
            { status: 400 }
        );
    }

    // Validate amount and week are provided
    if (amount === undefined || week === undefined) {
        return new Response(
            JSON.stringify({
                error: "amount and week are required",
            }),
            { status: 400 }
        );
    }

    // Validate that the two arrays are the same length
    if (addresses.length !== memberInvoiceAttestationIDs.length) {
        return new Response(
            JSON.stringify({
                error: "`addresses` and `memberInvoiceAttestationID` arrays must have the same length.",
            }),
            { status: 400 }
        );
    }

    try {
        await connectDB()
        // Define batch size
        const batchSize = 10000;

        // Split addresses into batches and insert each batch
        for (let i = 0; i < addresses.length; i += batchSize) {
            const batchAddresses = addresses.slice(i, i + batchSize);
            const batchMemberInvoiceAttestationIDs = memberInvoiceAttestationIDs.slice(i, i + batchSize);

            // Map each address to its respective invoice ID
            const documents = batchAddresses.map((address, index) => ({
                address: address,
                memberInvoiceAttestationID: batchMemberInvoiceAttestationIDs[index],
                amount: amount,
                week: week,
            }));

            // Bulk insert the batch
            await MemberInvoiceAttestation.insertMany(documents, { ordered: false });
        }

        // Return a success response
        return new Response(
            JSON.stringify({ message: "Batch insertion completed successfully!" }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}