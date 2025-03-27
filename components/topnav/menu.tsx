import { Bell } from "lucide-react";

import { usePrivy } from "@privy-io/react-auth";
import { useSidebar } from "@/providers/SidebarContext";
import { SidebarTrigger } from "../ui/sidebar";

export function Menu() {

    const { user } = usePrivy()
    const { sidebarOpen, setSidebarOpen } = useSidebar()

    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);

    const privyUserMetadata = user?.customMetadata
    
    
    return (
        <>
            <div className="flex shrink-0">
                <SidebarTrigger onClick={() => setSidebarOpen(!sidebarOpen)}/>
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