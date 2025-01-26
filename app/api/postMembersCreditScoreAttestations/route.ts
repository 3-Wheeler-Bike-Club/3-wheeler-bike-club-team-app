// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";
import MemberCreditScoreAttestation from "@/model/memberCreditScoreAttestation";

interface MemberCreditScoreAttestationData {
    score: number
    paidWeeks: number
    invoicedWeeks: number
}
interface MemberCreditScoreAttestationDataOffChain {
    address: string
    memberCreditScoreAttestationID: string
    score: number
    paidWeeks: number
    invoicedWeeks: number
}

export async function POST(
    req: Request,
) {
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { 
        addresses,
        memberCreditScoreAttestationIDs,
        memberCreditScoreAttestationsData 
    }: {
        addresses: string[],
        memberCreditScoreAttestationIDs: string[],
        memberCreditScoreAttestationsData: MemberCreditScoreAttestationData[]
    } = await req.json()

    
    // Validate input arrays
    if (!Array.isArray(addresses) || 
        !Array.isArray(memberCreditScoreAttestationIDs) || 
        !Array.isArray(memberCreditScoreAttestationsData)) {
        return new Response(
            JSON.stringify({
                error: "All inputs must be arrays",
            }),
            { status: 400 }
        );
    }

    // Validate that all arrays have the same length
    if (addresses.length !== memberCreditScoreAttestationIDs.length || 
        addresses.length !== memberCreditScoreAttestationsData.length) {
        return new Response(
            JSON.stringify({
                error: "All arrays must have the same length",
            }),
            { status: 400 }
        );
    }

    try {
        await connectDB()
        
        // Separate new members from updates
        const newMembersCreditScoreAttestations: MemberCreditScoreAttestationDataOffChain[] = [];
        const oldMembersUpdatedCreditScoreAttestations: MemberCreditScoreAttestationDataOffChain[] = [];
        
        addresses.forEach((address, index) => {
            const data = {
                address,
                memberCreditScoreAttestationID: memberCreditScoreAttestationIDs[index],
                score: memberCreditScoreAttestationsData[index].score,
                paidWeeks: memberCreditScoreAttestationsData[index].paidWeeks,
                invoicedWeeks: memberCreditScoreAttestationsData[index].invoicedWeeks
            };

            // Check if this is a new member (score=0, paidWeeks=0, invoicedWeeks=1)
            const isNewMemberCreditScoreAttestation = data.score === 0 && 
                              data.paidWeeks === 0 && 
                              data.invoicedWeeks === 1;

            if (isNewMemberCreditScoreAttestation) {
                newMembersCreditScoreAttestations.push(data);
            } else {
                oldMembersUpdatedCreditScoreAttestations.push(data);
            }
        });

        const results = {
            created: 0,
            updated: 0
        };

        // Define batch size
        const batchSize = 10000;

        // Process new members in batches
        for (let i = 0; i < newMembersCreditScoreAttestations.length; i += batchSize) {
            const batchNewMembersCreditScoreAttestations = newMembersCreditScoreAttestations.slice(i, i + batchSize);
            const createResult = await MemberCreditScoreAttestation.insertMany(
                batchNewMembersCreditScoreAttestations,
                { ordered: false }
            );
            results.created += createResult.length;
        }

        // Process updates in batches
        for (let i = 0; i < oldMembersUpdatedCreditScoreAttestations.length; i += batchSize) {
            const batchOldMembersUpdatedCreditScoreAttestations = oldMembersUpdatedCreditScoreAttestations.slice(i, i + batchSize);
            const updateOperations = batchOldMembersUpdatedCreditScoreAttestations.map(oldMembersUpdatedCreditScoreAttestation => ({
                updateOne: {
                    filter: { address: oldMembersUpdatedCreditScoreAttestation.address },
                    update: { 
                        $set: { 
                            memberCreditScoreAttestationID: oldMembersUpdatedCreditScoreAttestation.memberCreditScoreAttestationID, 
                            invoicedWeeks: oldMembersUpdatedCreditScoreAttestation.invoicedWeeks,
                        }
                    },
                    upsert: true
                }
            }));
            
            const updateResult = await MemberCreditScoreAttestation.bulkWrite(
                updateOperations,
                { ordered: false }
            );
            results.updated += updateResult.modifiedCount;
        }

        return new Response(
            JSON.stringify({ 
                message: "Batch operation completed successfully!",
                results
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Failed to process credit score attestations",
                details: error
            }),
            { status: 500 }
        );
    }
}
