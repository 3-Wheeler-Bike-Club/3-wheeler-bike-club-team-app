"use client"

import { usePrivy } from "@privy-io/react-auth";
import { Authorized } from "./authorized";
import { Unauthorized } from "./unauthorized";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { OffchainFleetOrder } from "@/hooks/offchain/useGetFleetOrders";

interface WrapperProps {
    order: OffchainFleetOrder
}


export function Wrapper({ order }: WrapperProps) {
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
                        ? <Authorized order={order}/>
                        : <Unauthorized/>
                    }
                    </main>
                </>
            )
        }
        </>
    );
}