
import { getHirePurchaseInvoiceAttestationsAction } from "@/app/actions/attestation/getHirePurchaseInvoiceAttestationsAction";
import { useState, useEffect } from "react"


export interface HirePurchaseInvoiceAttestation {
    address: string;
    hirePurchaseAttestationID: string;
    hirePurchaseInvoiceAttestationID: string;
    vin: string;
    invoiceID: string;
    amount: number;
    due: Date;
}

export const useGetHirePurchaseInvoiceAttestations = (address: string | undefined) => {
    const [hirePurchaseInvoiceAttestations, setHirePurchaseInvoiceAttestations] = useState<HirePurchaseInvoiceAttestation[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)


    useEffect (() =>{
        async function getMemberBadgeAttestation() {
           
            if(address){
                setLoading(true);
                try {
                    
                    const data = await getHirePurchaseInvoiceAttestationsAction(address)
                    setHirePurchaseInvoiceAttestations(data)

                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        
        }
        getMemberBadgeAttestation()
    },[address])


    async function getBackHirePurchaseInvoiceAttestations() {
        
        if(address){
            setLoading(true);
            try {
                
                const data = await getHirePurchaseInvoiceAttestationsAction(address)
                setHirePurchaseInvoiceAttestations(data)

            } catch(err){
                setError(err)
            }
            setLoading(false)
        }
        
    }

    return {hirePurchaseInvoiceAttestations, loading, error, getBackHirePurchaseInvoiceAttestations}
}