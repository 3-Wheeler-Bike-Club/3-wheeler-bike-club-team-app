"use client"


import { Button } from "../ui/button"
import { schemaCreator } from "@/utils/constants/addresses"
import { useAccount } from "wagmi"



export function Component () {

    const account = useAccount()
    console.log(account)



    return (
        <>
            {
                account.isConnected && account.address == schemaCreator && (
                    <Button>
                        Send Weekly Membership Fees
                    </Button>
                )
            }
        </>
    )
}