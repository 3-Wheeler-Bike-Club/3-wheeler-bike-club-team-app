"use server"


export const postHirePurchaseAttestationAction = async (address: string, memberBadgeAttestationID: string, hirePurchaseAttestationID: string, vin: string, amount: number, installments: number, firstDate: Date, lastDate: Date, contract: string) => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/postHirePurchaseAttestation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                address: address,
                memberBadgeAttestationID: memberBadgeAttestationID,
                hirePurchaseAttestationID: hirePurchaseAttestationID,
                vin: vin,
                amount: amount,
                installments: installments,
                firstDate: firstDate,
                lastDate: lastDate,
                contract: contract
            })
        })
    
        const data = await res.json()
        return data   
    } catch (error) {
        console.error(error)
    }
}


