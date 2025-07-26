"use server"


export async function updateProfileComplianceAction(
    address: `0x${string}`,
) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/kyc/updateProfileCompliance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.THREEWB_API_KEY
            },
            body: JSON.stringify({ 
                address: address,
            })
        })
        if (!response.ok) {
            throw new Error("Failed to update profile")
        }
        return response.json()
    } catch (error) { 
        console.log(error)
    }
}