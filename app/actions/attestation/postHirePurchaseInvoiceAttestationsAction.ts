"use server"


export const postHirePurchaseInvoiceAttestationsAction = async (address: string, hirePurchaseAttestationID: string, hirePurchaseInvoiceAttestationIDs: string[], vin: string, dues: Date[]) => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/postHirePurchaseInvoiceAttestations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                address: address,
                hirePurchaseAttestationID: hirePurchaseAttestationID,
                hirePurchaseInvoiceAttestationIDs: hirePurchaseInvoiceAttestationIDs,
                vin: vin,
                dues: dues
            })
        })
    
        const data = await res.json()
        return data   
    } catch (error) {
        console.error(error)
    }
}


