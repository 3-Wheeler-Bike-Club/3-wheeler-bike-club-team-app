"use server"

export async function getHirePurchaseCreditScoreAttestationAction (
    address: string
) {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/getHirePurchaseCreditScoreAttestation`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                address: address
            })
        }) 
        const data =  await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}