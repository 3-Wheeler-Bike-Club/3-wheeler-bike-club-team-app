import { Attestation } from "@ethsign/sp-sdk"

import { attester } from "@/utils/constants/addresses"
import { ownerPinkSlipSchemaID } from "@/utils/constants/addresses"
import { DataLocationOnChain } from "@ethsign/sp-sdk"

export async function deconstructOwnerPinkSlipAttestationData(recipients: string[], linkedAttestationId: string | null, vin: string, make: string, model: string, year: string, color: string, country: string, licensePlate: string, visualProof: string[], ownerProof: string, transferProof: string ) {
    const schemaData = {
        vin: vin,
        make: make,
        model: model,
        year: year,
        color: color,
        country: country,
        licensePlate: licensePlate,
        visualProof: visualProof,
        ownerProof: ownerProof,
        transferProof: transferProof,
    }


    const deconstructedOwnerPinkSlipAttestationData: Attestation= {
        schemaId: (ownerPinkSlipSchemaID), // The final number from our schema's ID.
        indexingValue: "0",
        linkedAttestationId: linkedAttestationId, // We are condiotionally linking an attestation.
        attestTimestamp: 0, // Will be generated for us.
        revokeTimestamp: 0, // Attestation is not revoked.
        attester: attester, // Alice's address.
        validUntil: 0, // We are not setting an expiry date.
        dataLocation: DataLocationOnChain.ONCHAIN, // We are placing data on-chain.
        revoked: false, // The attestation is not revoked.
        recipients: recipients, // Bob is our recipient.
        data: schemaData // The encoded schema data.
    }   
    return deconstructedOwnerPinkSlipAttestationData
}