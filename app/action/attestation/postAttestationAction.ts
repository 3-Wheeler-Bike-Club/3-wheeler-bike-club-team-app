"use server"

export async function postAttestationAction (
    address: string, 
    UID: string, 
) {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/postAttestation`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                address,
                UID, 
            })
        }) 
        const data =  await res.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
    
}