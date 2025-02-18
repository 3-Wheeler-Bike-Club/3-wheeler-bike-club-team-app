import { Menu } from "@/components/topnav/menu";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fill } from "./fill";
import { useGetOwnerPinkSlipAttestationByVin } from "@/hooks/attestation/useGetOwnerPinkSlipAttestationByVin";

interface AuthorizedProps {
    vin: string
}

export function Authorized({ vin }: AuthorizedProps) {

    const router = useRouter()
    
    const {ownerPinkSlipAttestationByVin, getBackOwnerPinkSlipAttestationByVin} = useGetOwnerPinkSlipAttestationByVin(vin)


    return (
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                <Menu/>
                <div className="flex flex-col w-full justify-center items-center">
                    <div className="flex w-full max-w-[66rem] items-center">
                        <ArrowLeft className="h-8 w-8" onClick={() =>  router.push("/register")}/>
                    </div>
                </div>
                {
                    ownerPinkSlipAttestationByVin?.licensePlate == "0xDEAD" ? (
                        <>
                            <div className="flex flex-col w-full justify-center items-center">
                                <div className="flex w-full max-w-[66rem] justify-end">
                                    <Fill ownerPinkSlipAttestationByVin={ownerPinkSlipAttestationByVin} getBackOwnerPinkSlipAttestationByVin={getBackOwnerPinkSlipAttestationByVin} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col w-full justify-center items-center">
                                <div className="flex w-full max-w-[66rem] justify-end">
                                    <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
                                        <p className="text-gray-500 text-sm">License Plate</p>
                                        <p className="text-lg font-semibold">{ownerPinkSlipAttestationByVin?.licensePlate}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                <div className="flex flex-col w-full justify-center items-center">
                    <div className="flex w-full max-w-[66rem] justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-500 text-sm">VIN</p>
                                <p className="text-lg font-semibold">{ownerPinkSlipAttestationByVin?.vin}</p>
                            </div>
                            <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-500 text-sm">Make</p>
                                <p className="text-lg font-semibold">{ownerPinkSlipAttestationByVin?.make}</p>
                            </div>
                            <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-500 text-sm">Model</p>
                                <p className="text-lg font-semibold">{ownerPinkSlipAttestationByVin?.model}</p>
                            </div>
                            <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-500 text-sm">Year</p>
                                <p className="text-lg font-semibold">{ownerPinkSlipAttestationByVin?.year}</p>
                            </div>
                            <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-500 text-sm">Color</p>
                                <p className="text-lg font-semibold">{ownerPinkSlipAttestationByVin?.color}</p>
                            </div>
                            <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-500 text-sm">Country</p>
                                <p className="text-lg font-semibold">{ownerPinkSlipAttestationByVin?.country}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            

        </main>

    )
}

