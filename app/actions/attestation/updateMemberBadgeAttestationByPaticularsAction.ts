"use server"

export const updateMemberBadgeAttestationByPaticularsAction = async (address: string, memberBadgeAttestationID: string, driverNationalID: string, driverLicenseID: string, driverHeadshot: string, driverAddress: string, driverPhone: string, guarantorNationalID: string, guarantorHeadshot: string, guarantorAddress: string, guarantorPhone: string) => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/updateMemberBadgeAttestationByPaticulars`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.WHEELER_API_KEY}`
            },
            body: JSON.stringify({
                address: address,
                memberBadgeAttestationID: memberBadgeAttestationID,
                driverNationalID: driverNationalID,
                driverLicenseID: driverLicenseID,
                driverHeadshot: driverHeadshot,
                driverAddress: driverAddress,
                driverPhone: driverPhone,
                guarantorNationalID: guarantorNationalID,
                guarantorHeadshot: guarantorHeadshot,
                guarantorAddress: guarantorAddress,
                guarantorPhone: guarantorPhone
            })
        })
    
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

