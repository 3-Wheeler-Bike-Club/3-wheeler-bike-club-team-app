import { getProfilesAction } from "@/app/actions/kyc/getProfilesAction"
import { useEffect, useState } from "react"
import { Profile } from "./useGetProfile"



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