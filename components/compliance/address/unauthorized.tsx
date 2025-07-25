import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Terminal } from "lucide-react"
import { useRouter } from "next/navigation"

export function Unauthorized() {
    const router = useRouter()
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Alert className="w-108">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Login First!</AlertTitle>
                <AlertDescription>
                    You cannot view the 3WB CLUB account without being Logged in.
                </AlertDescription>
            </Alert>
            <Button
                onClick={()=>{
                    router.push("/")
                }}
            >
                Go back Home
            </Button>
        </main>
    )
}