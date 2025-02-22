"use client"

import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Authorized } from "./authorized";
import { Unauthorized } from "./unauthorized";
import { User } from "@privy-io/server-auth";


interface WrapperProps {
    address: string
    driver: User
}
export function Wrapper({ address, driver }: WrapperProps) {
    const { user, ready, authenticated } = usePrivy()
    const router = useRouter()


    useEffect(() => {
        if (ready && authenticated && !user?.customMetadata) {
            router.replace("/profile")
        }

    }, [ready, authenticated, router, user?.customMetadata])
    return (
        <>
        {

            !ready 
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
                        authenticated
                        ? <Authorized address={address} driver={driver}/>
                        : <Unauthorized/>
                    }
                    </main>
                </>
            )
        }
        </>
    );
}