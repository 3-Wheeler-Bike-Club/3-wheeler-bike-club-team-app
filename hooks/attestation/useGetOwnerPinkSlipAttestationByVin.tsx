
import { getOwnerPinkSlipAttestationByVinAction } from "@/app/actions/attestation/getOwnerPinkSlipAttestationByVinAction"
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
    visualProof: string;
    ownerProof: string;
    transferProof: string;
}

export const useGetOwnerPinkSlipAttestationByVin = (vin: string) => {
    const [ownerPinkSlipAttestationByVin, setOwnerPinkSlipAttestationByVin] = useState<OwnerPinkSlipAttestation | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)


    useEffect (() =>{
        async function getOwnerPinkSlipAttestationByInvoice() {
           
            setLoading(true);
            try {
                
                const data = await getOwnerPinkSlipAttestationByVinAction(vin)
                setOwnerPinkSlipAttestationByVin(data)

            } catch(err){
                setError(err)
            }
            setLoading(false)
        
        }
        getOwnerPinkSlipAttestationByInvoice()
    },[])


    async function getBackOwnerPinkSlipAttestationByVin() {
        
        setLoading(true);
        try {
            
            const data = await getOwnerPinkSlipAttestationByVinAction(vin)
            setOwnerPinkSlipAttestationByVin(data)
        } catch(err){
            setError(err)
        }

        setLoading(false)
        
    }

    return {ownerPinkSlipAttestationByVin, loading, error, getBackOwnerPinkSlipAttestationByVin}
}