"use server"

export const updateOwnerPinkSlipAttestationPostRegisterAction = async ( 
    ownerPinkSlipAttestationID: string, 
    vin: string, 
    licensePlate: string, 
    visualProof: string[], 
    ownerProof: string, 
) => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/updateOwnerPinkSlipAttestationPostRegister`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                ownerPinkSlipAttestationID: ownerPinkSlipAttestationID!,
                vin: vin!,
                licensePlate: licensePlate!,
                visualProof: visualProof!,
                ownerProof: ownerProof!,
            })
        }) 
   

        const data = await res.json()
        return data

    } catch (error) {
        console.error(error)
        throw error
    }
}

