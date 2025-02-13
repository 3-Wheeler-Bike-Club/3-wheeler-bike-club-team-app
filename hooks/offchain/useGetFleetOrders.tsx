
import { getFleetOrdersAction } from "@/app/actions/offchain/getFleetOrdersAction"
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

export const useGetFleetOrders = () => {
    const [fleetOrders, setFleetOrders] = useState<OffchainFleetOrder[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)


    useEffect (() =>{
        async function getFleetOrders() {
           
            setLoading(true);
            try {
                
                const data = await getFleetOrdersAction()
                setFleetOrders(data)

            } catch(err){
                setError(err)
            }
            setLoading(false)
        
        }
        getFleetOrders()
    },[])


    async function getBackFleetOrders() {
        
        setLoading(true);
        try {
            
            const data = await getFleetOrdersAction()
            setFleetOrders(data)
        } catch(err){
            setError(err)
        }

        setLoading(false)
        
    }

    return {fleetOrders, loading, error, getBackFleetOrders}
}