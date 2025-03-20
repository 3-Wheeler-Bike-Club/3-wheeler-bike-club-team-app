// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import HirePurchaseInvoiceAttestation from "@/model/hirePurchaseInvoiceAttestation";
import { weeklyInstallment } from "@/utils/constants/misc";
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";


export  async function POST(
    req: Request,
) {
    
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { address, hirePurchaseAttestationID, hirePurchaseInvoiceAttestationIDs, vin, dues } = await req.json()

    try {
        await connectDB()

        const documents = hirePurchaseInvoiceAttestationIDs.map((hirePurchaseInvoiceAttestationID: string, index: number) => ({
            address: address,
            hirePurchaseAttestationID: hirePurchaseAttestationID,
            hirePurchaseInvoiceAttestationID: hirePurchaseInvoiceAttestationID,
            vin: vin,
            invoiceID: `${index+1}/${hirePurchaseInvoiceAttestationIDs.length}`,
            amount: weeklyInstallment,
            due: dues[index]
        }));

        await HirePurchaseInvoiceAttestation.insertMany(documents, { ordered: false });

        return new Response(
            JSON.stringify({ message: "insertion completed successfully!" }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}