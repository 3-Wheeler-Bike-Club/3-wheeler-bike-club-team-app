"use client"


import { Button } from "../ui/button"
import { getPrivyUserData } from "@/app/action/privy/getPrivyUserData"
import { postAttestationAction } from "@/app/action/attestation/postAttestationAction"
import { schemaCreator, unpaidUID } from "@/utils/constants/addresses"
import { useAccount } from "wagmi"



export function Component () {

    const account = useAccount()
    console.log(account)
    
    async function generatePrivyUsersList() {
        const users  = await getPrivyUserData()
        console.log(users)

        
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
        return (smartWalletAddresses)
    }

    const getISOWeek = (date: Date): string => {
        const year = date.getFullYear();
        const oneJan = new Date(year, 0, 1);
        const dayOfYear = Math.ceil((date.getTime() - oneJan.getTime()) / 86400000);
        const weekNumber = Math.ceil((dayOfYear + oneJan.getDay() + 1) / 7);
        return `${String(weekNumber).padStart(2, '0')}, ${year}`;
    };

    async function sendWeeklyInvoices() {
        const smartWallets = await generatePrivyUsersList()
        const currentWeek = getISOWeek(new Date());
        if (!smartWallets) return
        for (let i = 0; i < smartWallets.length; i++) {
            const walletOfRider = smartWallets[i];
            postAttestationAction(walletOfRider, currentWeek, unpaidUID)
        }
    }
    return (
        <>
            {
                account.isConnected && account.address == schemaCreator && (
                    <Button onClick={()=>{
                        sendWeeklyInvoices()
                    }}>
                        Send Weekly Membership Fees
                    </Button>
                )
            }
        </>
    )
}