import { useState, useEffect } from "react"
import { getMemberBadgeAttestationsAction } from "@/app/actions/attestation/getMemberBadgeAttestationsAction"
import { MemberBadgeAttestation } from "./useGetMemberBadgeAttestation"

export const useGetMemberBadgeAttestations = () => {
    const [memberBadgeAttestations, setMemberBadgeAttestations] = useState<MemberBadgeAttestation[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)


    useEffect (() =>{
        async function getMemberBadgeAttestation() {   
            
            setLoading(true);
            try {
                
                const data = await getMemberBadgeAttestationsAction()
                setMemberBadgeAttestations(data)

            } catch(err){
                setError(err)
            }
            setLoading(false)
        
        }
        getMemberBadgeAttestation()
    },[])


    async function getBackMemberBadgeAttestation() {
        
        setLoading(true);
        try {
            
            const data = await getMemberBadgeAttestationsAction()
            setMemberBadgeAttestations(data)

        } catch(err){
            setError(err)
        }
        setLoading(false)
        
    }

    return {memberBadgeAttestations, loading, error, getBackMemberBadgeAttestation}
}