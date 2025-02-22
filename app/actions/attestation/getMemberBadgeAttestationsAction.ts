"use server"

export const getMemberBadgeAttestationsAction = async () => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/getMemberBadgeAttestations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
        })
    
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

