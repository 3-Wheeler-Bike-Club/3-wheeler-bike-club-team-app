import { useEffect } from "react";
import { Menu } from "../topnav/menu";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Caravan, FileUser } from "lucide-react";
import { DataTable } from "./dataTable";
import { Columns } from "./columns";
import { useGetMemberBadgeAttestations } from "@/hooks/attestation/useGetMemberBadgeAttestations";
import { useState } from "react";
import { MemberBadgeAttestation } from "@/hooks/attestation/useGetMemberBadgeAttestation";


export function Authorized() {

    const {memberBadgeAttestations} = useGetMemberBadgeAttestations()
    console.log(memberBadgeAttestations)
    const [memberBadgeAttestationsWithCodeZero, setMemberBadgeAttestationsWithCodeZero] = useState<MemberBadgeAttestation[] | null>(null)

    useEffect(() => {
        if (memberBadgeAttestations) {
            const filtered = memberBadgeAttestations.filter(memberBadgeAttestation => memberBadgeAttestation.status === 1 && memberBadgeAttestation.driver == true && memberBadgeAttestation.guarantor == true && memberBadgeAttestation.national == true)
            setMemberBadgeAttestationsWithCodeZero(filtered)
        }
    }, [memberBadgeAttestations])

    return (
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                <Menu/>
                <div className="flex w-full justify-center">
                    <Alert className="w-full max-w-[66rem]">
                        <Caravan className="h-4 w-4" />
                        <AlertTitle className="font-bold">Assign Drivers!</AlertTitle>
                        <AlertDescription className="text-xs italic">
                            Assign 3-wheelers to Verfied & Approved Drivers after signing Hire Purchase Agreement.
                        </AlertDescription>
                    </Alert>
                </div>



                <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6 items-center">
                {
                    memberBadgeAttestationsWithCodeZero == null && (
                        <div className="flex flex-col w-full gap-3 items-center">
                            <p className="font-bold">Loading...</p>
                        </div>
                    )
                }
                {
                    memberBadgeAttestationsWithCodeZero && memberBadgeAttestationsWithCodeZero?.length === 0 && (
                        <div className="flex flex-col w-full gap-3 items-center">
                            <FileUser className="h-36 w-36" />
                            <p className="font-bold">Waiting for Drivers to pass KYC...</p>
                        </div>
                    )
                }
                {
                    memberBadgeAttestationsWithCodeZero && memberBadgeAttestationsWithCodeZero?.length >= 1 && (
                        <div className="flex flex-col w-full max-w-[66rem] gap-3">
                            <DataTable columns={Columns} data={memberBadgeAttestationsWithCodeZero!} />
                        </div>
                    )
                }
                </div>
            </div>
        </main>
    )
}

