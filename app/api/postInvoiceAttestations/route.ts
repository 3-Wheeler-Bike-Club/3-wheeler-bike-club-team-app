// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";
import InvoiceAttestation from "@/model/invoiceAttestation";


export  async function POST(
    req: Request,
) {
    
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { addresses, invoiceSchemaIDs } = await req.json()
    

    // Validate input
    if (!Array.isArray(addresses) || !Array.isArray(invoiceSchemaIDs)) {
        return new Response(
            JSON.stringify({
                error: "`addresses` and `invoiceSchemaID` must both be arrays.",
            }),
            { status: 400 }
        );
    }
    // Validate that the two arrays are the same length
    if (addresses.length !== invoiceSchemaIDs.length) {
        return new Response(
            JSON.stringify({
                error: "`addresses` and `invoiceSchemaID` arrays must have the same length.",
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
            const batchInvoiceIDs = invoiceSchemaIDs.slice(i, i + batchSize);

            // Map each address to its respective invoice ID
            const documents = batchAddresses.map((address, index) => ({
                address: address,
                invoiceSchemaID: batchInvoiceIDs[index],
            }));

            // Bulk insert the batch
            await InvoiceAttestation.insertMany(documents, { ordered: false });
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