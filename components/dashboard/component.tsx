"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { getPrivyUserData } from "@/app/action/privy/getPrivyUserData"



export function Component () {

    const [smartWallets, setSmartWallets] = useState<string[] | null>(null)
    
    async function yh() {
        const users  = await getPrivyUserData()
        console.log(users)
        console.log(smartWallets)
        
        // Create an array to hold all smart wallet addresses

        // @ts-expect-error/cannot-use-privy-types
        const smartWalletAddresses = users.flatMap(user =>
            user.linked_accounts
            // @ts-expect-error/cannot-use-privy-types
            .filter(account => account.type === "smart_wallet") // Filter for smart_wallet accounts
            // @ts-expect-error/cannot-use-privy-types
            .map(account => account.address) // Extract the smart wallet address
        );
        
        console.log(smartWalletAddresses);
        setSmartWallets(smartWalletAddresses)
        
    }
    return (
        <>
            <Button onClick={()=>{
                yh()
            }}>
                SDSD
            </Button>
        </>
    )
}