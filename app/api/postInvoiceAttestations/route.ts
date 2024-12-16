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
    
    const { addresses, invoiceSchemaID } = await req.json()
    
    // Validate input
    if (!Array.isArray(addresses) || !invoiceSchemaID) {
        return new Response(
            JSON.stringify({ error: "Invalid input. `addresses` must be an array and `invoiceSchemaID` is required." }),
            { status: 400 }
        );
    }

    try {
        await connectDB()
        // Define batch size
        const batchSize = 10000;

        // Split addresses into batches and insert each batch
        for (let i = 0; i < addresses.length; i += batchSize) {
            const batch = addresses.slice(i, i + batchSize);

            // Map the batch to documents
            const documents = batch.map((address) => ({
                address: address,
                invoiceSchemaID: invoiceSchemaID,
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