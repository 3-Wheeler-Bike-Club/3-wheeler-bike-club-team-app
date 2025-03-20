
import { getOwnerPinkSlipAttestationByInvoiceAction } from "@/app/actions/attestation/getOwnerPinkSlipAttestationByInvoiceAction"
import { useState, useEffect } from "react"


export interface OwnerPinkSlipAttestation {
    address: string;
    invoice: string;
    hirePurchaseAttestationID: string;
    ownerPinkSlipAttestationID: string;
    vin: string;
    make: string;
    model: string;
    year: string;
    color: string;
    country: string;
    licensePlate: string;
    visualProof: string[];
    ownerProof: string;
    transferProof: string;
}

export const useGetOwnerPinkSlipAttestationByInvoice = (invoice: string | undefined) => {
    const [ownerPinkSlipAttestationByInvoice, setOwnerPinkSlipAttestationByInvoice] = useState<OwnerPinkSlipAttestation[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)
 

    useEffect (() =>{
        async function getOwnerPinkSlipAttestationByInvoice() {
           
            if(invoice){
                setLoading(true);
                try {
                    
                    const data = await getOwnerPinkSlipAttestationByInvoiceAction(invoice)
                    setOwnerPinkSlipAttestationByInvoice(data)

                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        
        }
        getOwnerPinkSlipAttestationByInvoice()
    },[invoice])


    async function getBackOwnerPinkSlipAttestationByInvoice() {
        
        if(invoice){
            setLoading(true);
            try {
                
                const data = await getOwnerPinkSlipAttestationByInvoiceAction(invoice)
                setOwnerPinkSlipAttestationByInvoice(data)

            } catch(err){
                setError(err)
            }
            setLoading(false)
        }
        
    }

    return {ownerPinkSlipAttestationByInvoice, loading, error, getBackOwnerPinkSlipAttestationByInvoice}
}