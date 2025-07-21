import { getProfilesAction } from "@/app/actions/kyc/getProfilesAction"
import { useEffect, useState } from "react"


export interface Profile {
    address: `0x${string}`
    email: string
    phone: string
    firstname: string
    othername: string
    lastname: string
    id: string
    files: string[]
}

export const useGetProfiles = () => {
    const [profiles, setProfiles] = useState<Profile[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect(() => {
        async function getProfiles() {
            try {
                setLoading(true)
                const data = await getProfilesAction()
                setProfiles(data)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        getProfiles()
    }, [])

    const getProfileSync = async () => {
        try {
            setLoading(true)
            const data = await getProfilesAction()
            setProfiles(data)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    return { profiles, loading, error, getProfileSync }
}