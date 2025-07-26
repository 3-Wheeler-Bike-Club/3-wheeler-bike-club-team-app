import { useGetProfiles } from "@/hooks/kyc/useGetProfiles"
import { Menu } from "../topnav/menu"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { OctagonX, Scroll } from "lucide-react"
import { Profile } from "@/hooks/kyc/useGetProfile"
import { useEffect, useState } from "react"
import { DataTable } from "./dataTable"
import { Columns } from "./columns"

export function Authorized() {
    const { profiles, loading } = useGetProfiles()
    const [profilesPendingCompliance, setProfilesPendingCompliance] = useState<Profile[] | null>(null)
    console.log(profiles)
    console.log(loading)

    useEffect(() => {
        if (profiles) {
            const filtered = profiles.filter(profile => profile.compliant === false && profile.files?.length > 0)
            setProfilesPendingCompliance(filtered)
        }
    }, [profiles])

    return (
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                <Menu/>

                <div className="flex w-full justify-center">
                    <Alert className="w-full max-w-[66rem]">
                        <Scroll className="h-4 w-4" />
                        <AlertTitle className="font-bold">Compliance</AlertTitle>
                        <AlertDescription className="text-xs italic">
                            Manage compliance for 3-Wheelers Investors.
                        </AlertDescription>
                    </Alert>
                </div>

                <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6 items-center">
                {
                    !profilesPendingCompliance && (
                        <div className="flex flex-col w-full gap-3 items-center">
                            <p className="font-bold">Loading...</p>
                        </div>
                    )
                }
                {
                    profilesPendingCompliance && profilesPendingCompliance?.length === 0 && (
                        <div className="flex flex-col w-full gap-3 items-center">
                            <OctagonX className="h-36 w-36" />
                            <p className="font-bold">No registered 3-Wheelers Investors found</p>
                        </div>
                    )
                }
                {
                    profilesPendingCompliance && profilesPendingCompliance?.length >= 1 && (
                        <div className="flex flex-col w-full max-w-[66rem] gap-3">
                            <DataTable columns={Columns} data={profilesPendingCompliance!} />
                        </div>
                    )
                }
                </div>

            </div>
        </main>
    )
}