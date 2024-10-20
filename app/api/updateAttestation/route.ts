// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/utils/db/mongodb";
import Attestation from "@/model/attestation";
import { middleware } from "@/utils/middleware";


export  async function POST(
    req: Request,
) {
    
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { _id, UID } = await req.json()

    try {
        await connectDB()
        const attestation = await Attestation.findByIdAndUpdate(
            _id,                    // Find by the document's `_id`
            { UID: UID },           // Update the `UID` field with the new value
            { new: true }           // Return the updated document
        );
        if (!attestation) {
            return new Response(
                JSON.stringify({ message: "Attestation not found" }),
                { status: 404 }
            );
        }
        return new Response(JSON.stringify(attestation), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "An error occurred", error }),
            { status: 500 }
        );

    }
}