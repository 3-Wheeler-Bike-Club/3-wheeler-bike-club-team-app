"use server"


export async function getFleetOrderAction(invoice: string) {
    try {
        // Fetch fleet orders from your API
        const res = await fetch(`${process.env.BASE_URL}/api/getFleetOrder`, {
            method: "POST",
            headers: {

                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                invoice: invoice
            })
        })

        if (!res.ok) {
            if (res.status === 404) {
                throw new Error(`Fleet order not found`)
            }
            throw new Error('Failed to fetch fleet order')

        }

        const data = await res.json()
        return data

    } catch (error) {
        console.error(error)
        throw error
    }
}

