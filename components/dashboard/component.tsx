"use client"

import { Button } from "../ui/button"
import { getPrivyUserData } from "@/app/action/privy/getPrivyUserData"

export function Component () {
    async function yh() {
        const users = await getPrivyUserData()
        console.log(users)
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