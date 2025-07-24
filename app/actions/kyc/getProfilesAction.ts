"use server"

export async function getProfilesAction() {
    try {
        const response = await fetch(`${process.env.BASE_URL_FINANCE}/api/kyc/getProfiles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.THREEWB_API_KEY
            }
        })
        if (!response.ok) {
            throw new Error("Failed to get profiles")
        }
        return response.json()
    } catch (error) {
        console.log(error)
    }
}