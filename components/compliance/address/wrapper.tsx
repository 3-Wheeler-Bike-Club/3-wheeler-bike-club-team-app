


"use client"

import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Authorized } from "./authorized";
import { Unauthorized } from "./unauthorized";
import { User } from "@privy-io/server-auth";
import { useGetProfile } from "@/hooks/kyc/useGetProfile";

interface WrapperProps {    
    address: string
    user: string
}

export function Wrapper({ address, user }: WrapperProps) {
    //const { user, ready, authenticated } = usePrivy()
    const router = useRouter()
    const { profile, loading, error, getProfileSync } = useGetProfile(address as `0x${string}`)
    /*

    useEffect(() => {
        if (ready && authenticated && !user?.customMetadata) {
            router.replace("/profile")
        }

    }, [ready, authenticated, router, user?.customMetadata])
    */
    return (
        <>
        {

            !loading 
            ?(
                <>
                    <main className="flex min-h-screen flex-col items-center justify-between p-24">
                        <p>loading....</p>
                    </main>
                </>
            )
            :(
                <>
                    <main className="flex w-full h-full">
                    {
                        profile
                        ? <Authorized address={address} user={user}/>
                        : <Unauthorized/>
                    }
                    </main>
                </>
            )
        }
        </>
    );
}