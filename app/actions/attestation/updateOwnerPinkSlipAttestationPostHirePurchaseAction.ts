"use server"

export const updateOwnerPinkSlipAttestationPostHirePurchaseAction = async ( 
    vin: string, 
    hirePurchaseAttestationID: string, 
) => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/updateOwnerPinkSlipAttestationPostHirePurchase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                hirePurchaseAttestationID: hirePurchaseAttestationID!,
                vin: vin!,
            })
        }) 
   

        const data = await res.json()
        return data

    } catch (error) {
        console.error(error)
        throw error
    }
}

