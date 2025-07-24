import { Menu } from "@/components/topnav/menu"
import { useGetProfile } from "@/hooks/kyc/useGetProfile"
import { ArrowLeft, Check } from "lucide-react"
import { useRouter } from "next/navigation"

interface AuthorizedProps {
    address: string
}

export function Authorized({ address }: AuthorizedProps) {
    const { profile } = useGetProfile(address as `0x${string}`)
    const router = useRouter()
    
    console.log(profile)
    return (
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                <Menu/>

                <div className="flex flex-col w-full justify-center items-center">
                    <div className="flex w-full max-w-[66rem] items-center">
                        <ArrowLeft className="h-8 w-8" onClick={() =>  router.push("/assign")}/>
                    </div>
                </div>
                <div className="flex flex-col w-full justify-center items-center">
                    <div className="flex w-full max-w-[66rem] justify-end">
                        <Check/>
                        
                    </div>
                </div>  
                
            </div>
        </main>
    )
}