"use server"

import { fleetOrderBookAbi } from "@/utils/abis/fleetOrderBook"
import { walletClient } from "@/utils/client"
import { fleetOrderBook } from "@/utils/constants/addresses"

export const setCompliance = async (address: string) => {
    const tx = await walletClient.writeContract({
        address: fleetOrderBook,
        abi: fleetOrderBookAbi,
        functionName: "setCompliance",
        args: [[address as `0x${string}`]],
    })
    return tx
}