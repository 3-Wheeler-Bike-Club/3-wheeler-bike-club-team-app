import { Bell } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";

import { usePrivy } from "@privy-io/react-auth";
export function Menu() {

    const { user } = usePrivy()

    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);

    const privyUserMetadata = user?.customMetadata
    
    
    return (
        <>
            <div className="flex shrink-0">
                <SidebarTrigger/>
            </div>

            <div className="flex justify-between w-full shrink-0">
                <div className="flex flex-col gap-2">
                    <p><span className="text-sm italic">hello</span>, <span className="font-semibold text-2xl">{privyUserMetadata?.firstname}</span></p>
                </div>

                <div className="flex items-center gap-2">
                    <Bell />
                </div>
            </div>
        </>
    )
}