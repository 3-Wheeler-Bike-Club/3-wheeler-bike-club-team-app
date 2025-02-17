import { useEffect } from "react";
import { useState } from "react";
import { Menu } from "../topnav/menu";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Scroll } from "lucide-react";
import { DataTable } from "../register/dataTable";
import { Columns } from "../register/columns";
import { OwnerPinkSlipAttestation } from "@/hooks/attestation/useGetOwnerPinkSlipAttestationByInvoice";
import { useGetOwnersPinkSlipAttestations } from "@/hooks/attestation/useGetOwnersPinkSlipAttestations";

export function Authorized() {

    const {ownersPinkSlipAttestations} = useGetOwnersPinkSlipAttestations()
    const [ownersPinkSlipAttestationsPendingRegistration, setOwnersPinkSlipAttestationsPendingRegistration] = useState<OwnerPinkSlipAttestation[]>([])

    useEffect(() => {
        if (ownersPinkSlipAttestations) {
            const filtered = ownersPinkSlipAttestations.filter(ownersPinkSlipAttestation => ownersPinkSlipAttestation.licensePlate === "0xDEAD")
            setOwnersPinkSlipAttestationsPendingRegistration(filtered)
        }
    }, [ownersPinkSlipAttestations])

    return (
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                <Menu/>
                <div className="flex w-full justify-center">
                    <Alert className="w-full max-w-[66rem]">
                        <Scroll className="h-4 w-4" />
                        <AlertTitle className="font-bold">Register 3WBs!</AlertTitle>
                        <AlertDescription className="text-xs italic">
                            Manage registered 3-Wheelers, mark status code: 2 when certified by DVLA.
                        </AlertDescription>
                    </Alert>
                </div>

                <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6 items-center">
                {
                    ownersPinkSlipAttestationsPendingRegistration && ownersPinkSlipAttestationsPendingRegistration?.length >= 1 && (
                        <div className="flex flex-col w-full max-w-[66rem] gap-3">
                            <DataTable columns={Columns} data={ownersPinkSlipAttestationsPendingRegistration!} />
                        </div>
                    )
                }
                </div>
            </div>
        </main>
    )
}

