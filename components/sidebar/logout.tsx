
import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"

import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger 
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"


export function Logout () {
    
    const { logout } = usePrivy()
    const router = useRouter()

    
    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex items-center gap-2">
                    <LogOut size={18} color="gold"/>
                    <span className="text-base font-semibold">Log Out</span>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action will log you out of your admin dashboard. You can no longer view your account information!
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                    <Button
                        onClick={async ()=>{
                            await logout()
                            router.push("/")
                        }}
                        className="gap-2"
                    >
                        <LogOut/>
                        Continue
                    </Button>
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}