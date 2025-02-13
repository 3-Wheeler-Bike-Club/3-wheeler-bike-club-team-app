"use server"

import {
    SignProtocolClient,
    SpMode,
    EvmChains,
    Attestation
} from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";
  
export async function revoke(attestationID: string) {
    try {
        const privateKey = process.env.ATTEST_PRIVATE_KEY as `0x${string}`; // account responsible for paying gas fees
  
        const client = new SignProtocolClient(SpMode.OnChain, {
            chain: EvmChains.celo,
            account: privateKeyToAccount(privateKey) // required in backend environments
        });

        const data = client.revokeAttestation(attestationID, {reason: "receipt updated"})
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

