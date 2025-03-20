import { Attestation } from "@ethsign/sp-sdk"
import { attester, hirePurchaseSchemaID } from "@/utils/constants/addresses"
import { DataLocationOnChain } from "@ethsign/sp-sdk"

export async function deconstructHirePurchaseAttestationData(recipients: string[], vin: string, amount: number, installments: number, firstDate: Date, lastDate: Date, contract: string ) {
    const schemaData = {
        vin: vin,
        amount: amount,
        installments: installments,
        firstDate: firstDate,
        lastDate: lastDate,
        contract: contract,
    }


    const deconstructedHirePurchaseAttestationData: Attestation= {
        schemaId: (hirePurchaseSchemaID), // The final number from our schema's ID.
        indexingValue: "0",
        linkedAttestationId: null, // We are not linking an attestation.
        attestTimestamp: 0, // Will be generated for us.
        revokeTimestamp: 0, // Attestation is not revoked.
        attester: attester, // Alice's address.
        validUntil: 0, // We are not setting an expiry date.
        dataLocation: DataLocationOnChain.ONCHAIN, // We are placing data on-chain.
        revoked: false, // The attestation is not revoked.
        recipients: recipients, // Bob is our recipient.
        data: schemaData // The encoded schema data.
    }   
    return deconstructedHirePurchaseAttestationData
}