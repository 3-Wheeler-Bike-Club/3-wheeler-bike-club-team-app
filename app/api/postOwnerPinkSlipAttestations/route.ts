// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import OwnerPinkSlipAttestation from "@/model/ownerPinkSlipAttestation";
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";

export async function POST(
    req: Request,
) {
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { 
        addresses, 
        invoices,
        hirePurchaseAttestationIDs,
        ownerPinkSlipAttestationIDs, 
        vins, 
        makes, 
        models, 
        years, 
        colors, 
        countries, 
        licensePlates, 
        visualProofs, 
        ownerProofs, 
        transferProofs 
    } = await req.json();

    
    try {
        await connectDB();

        
/*
        // Validate input arrays
        if (addresses !== invoices || addresses.length !== ownerPinkSlipAttestationIDs.length || addresses.length !== vins.length || addresses.length !== makes.length || addresses.length !== models.length || addresses.length !== years.length || addresses.length !== colors.length || addresses.length !== countries.length || addresses.length !== licensePlates.length || addresses.length !== visualProofs.length || addresses.length !== ownerProofs.length || addresses.length !== transferProofs.length) {
            return new Response(JSON.stringify({ error: "Input arrays must be of the same length" }), { status: 404 });
        }
*/      
        // Validate if VINs already exist in database
        const existingVins = await OwnerPinkSlipAttestation.find({
            vin: { $in: vins }
        });

        if (existingVins.length > 0) {
            return new Response(
                JSON.stringify({
                    error: "Some VINs already exist in the database",
                    existingVins: existingVins.map(v => v.vin)
                }),
                { status: 400 }
            );
        }
        
        const documents = addresses.map((address: string, index: number) => ({
            address,
            invoice: invoices?.[index],
            hirePurchaseAttestationID: hirePurchaseAttestationIDs?.[index],
            ownerPinkSlipAttestationID: ownerPinkSlipAttestationIDs[index],
            vin: vins?.[index],
            make: makes?.[index],
            model: models?.[index],
            year: years?.[index],
            color: colors?.[index],
            country: countries?.[index],
            licensePlate: licensePlates?.[index],
            visualProof: visualProofs?.[index],
            ownerProof: ownerProofs?.[index],
            transferProof: transferProofs?.[index]
        }));

        await OwnerPinkSlipAttestation.insertMany(documents, { ordered: false });

        return new Response(
            JSON.stringify({ message: "insertion completed successfully!" }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}