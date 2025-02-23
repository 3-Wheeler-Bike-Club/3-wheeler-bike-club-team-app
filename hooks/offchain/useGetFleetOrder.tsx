
import { getFleetOrderAction } from "@/app/actions/offchain/getFleetOrderAction"
import { useState, useEffect } from "react"


export interface OffchainFleetOrder {
    _id: string
    address: string
    invoice: string
    amount: number
    tender: string
    reference: string
    status: number
    ownerPinkSlipAttestationID: string[]
    createdAt: string

}

export const useGetFleetOrder = (invoice: string | undefined) => {
    const [fleetOrder, setFleetOrder] = useState<OffchainFleetOrder | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)


    useEffect (() =>{
        async function getFleetOrder() {
           
            if (invoice) {
                setLoading(true);
                try {
                    
                    const data = await getFleetOrderAction(invoice)
                    setFleetOrder(data)

                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        
        }
        getFleetOrder()
    },[invoice])


    async function getBackFleetOrder() {
        
        if (invoice) {
            setLoading(true);
            try {
                
                const data = await getFleetOrderAction(invoice)
                setFleetOrder(data)

            } catch(err){
                setError(err)
            }
            setLoading(false)
        }
        
    }

    return {fleetOrder, loading, error, getBackFleetOrder}
}