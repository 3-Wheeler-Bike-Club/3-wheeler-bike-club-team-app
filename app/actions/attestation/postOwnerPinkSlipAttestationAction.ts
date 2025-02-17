"use server"

export const postOwnerPinkSlipAttestationAction = async (
    addresses: string[] | undefined, 
    invoices: string[] | undefined,
    hirePurchaseAttestationIDs: string[] | undefined,
    ownerPinkSlipAttestationIDs: string[] | undefined, 
    vins: string[] | undefined, 
    makes: string[] | undefined, 
    models: string[] | undefined, 
    years: string[] | undefined, 
    colors: string[] | undefined, 
    countries: string[] | undefined, 
    licensePlates: string[] | undefined, 
    visualProofs: string[][] | undefined, 
    ownerProofs: string[] | undefined, 
    transferProofs: string[] | undefined
) => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/postOwnerPinkSlipAttestations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                addresses: addresses!,
                invoices: invoices!,
                hirePurchaseAttestationIDs: hirePurchaseAttestationIDs!,
                ownerPinkSlipAttestationIDs: ownerPinkSlipAttestationIDs!,
                vins: vins!,
                makes: makes!,
                models: models!,
                years: years!,
                colors: colors!,
                countries: countries!,
                licensePlates: licensePlates!,
                visualProofs: visualProofs!,
                ownerProofs: ownerProofs!,
                transferProofs: transferProofs!
            })
        })
        if (!res.ok) {
            if (res.status === 400) {
                throw new Error(`vin already exists`)
            }
            throw new Error('Failed to post owner pink slip attestations')
        }
    
           /*
        if (!res.ok) {
            if (res.status === 404) {
                throw new Error(`Input arrays must be of the same length`)
            }
            throw new Error('Failed to post owner pink slip attestations')
        }
            */

        const data = await res.json()
        return data

    } catch (error) {
        console.error(error)
        throw error
    }
}

