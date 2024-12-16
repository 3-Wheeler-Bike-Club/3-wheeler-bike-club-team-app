"use server"

export async function postReceiptAttestationAction (
    address: string, 
    receiptSchemaID: string
) {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/postReceiptAttestation`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                address: address,
                receiptSchemaID: receiptSchemaID
            })
        }) 
        const data =  await res.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
    
}