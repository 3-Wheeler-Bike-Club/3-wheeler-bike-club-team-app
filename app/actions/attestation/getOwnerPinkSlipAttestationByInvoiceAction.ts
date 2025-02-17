"use server"

export const getOwnerPinkSlipAttestationByInvoiceAction = async (invoice: string) => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/getOwnerPinkSlipAttestationByInvoice`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                invoice: invoice
            })
        })
    
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

