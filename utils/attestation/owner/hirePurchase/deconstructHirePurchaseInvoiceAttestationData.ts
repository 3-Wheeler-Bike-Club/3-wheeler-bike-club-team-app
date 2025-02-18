import { Attestation } from "@ethsign/sp-sdk"

import { attester, hirePurchaseInvoiceSchemaID } from "@/utils/constants/addresses"
import { ownerPinkSlipSchemaID } from "@/utils/constants/addresses"
import { DataLocationOnChain } from "@ethsign/sp-sdk"

export function deconstructHirePurchaseInvoiceAttestationData(recipients: string[], vin: string, invoiceID: string, amount: number, linkedAttestationId: string ) {
    const schemaData = {
        vin: vin,
        invoiceID: invoiceID,
        amount: amount,
    }


    const deconstructedHirePurchaseInvoiceAttestationData: Attestation= {
        schemaId: (hirePurchaseInvoiceSchemaID), // The final number from our schema's ID.
        indexingValue: "0",
        linkedAttestationId: linkedAttestationId, // We are linking an hire purchase attestation.
        attestTimestamp: 0, // Will be generated for us.
        revokeTimestamp: 0, // Attestation is not revoked.
        attester: attester, // Alice's address.
        validUntil: 0, // We are not setting an expiry date.
        dataLocation: DataLocationOnChain.ONCHAIN, // We are placing data on-chain.
        revoked: false, // The attestation is not revoked.
        recipients: recipients, // Bob is our recipient.
        data: schemaData // The encoded schema data.
    }   
    return deconstructedHirePurchaseInvoiceAttestationData
}