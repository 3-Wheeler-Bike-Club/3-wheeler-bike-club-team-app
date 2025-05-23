import { Menu } from "@/components/topnav/menu";
import { useGetMemberBadgeAttestation } from "@/hooks/attestation/useGetMemberBadgeAttestation";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fill } from "./fill";
import { User } from "@privy-io/server-auth";
import { useState } from "react";
import { useGetOwnersPinkSlipAttestations } from "@/hooks/attestation/useGetOwnersPinkSlipAttestations";
import { useEffect } from "react";
import { OwnerPinkSlipAttestation } from "@/hooks/attestation/useGetOwnerPinkSlipAttestationByInvoice";


interface AuthorizedProps {
    address: string
    driver: User
}

export function Authorized({ address, driver }: AuthorizedProps) {

    const router = useRouter()
    const privyUserMetadata = driver?.customMetadata
    
    const {memberBadgeAttestation, getBackMemberBadgeAttestation} = useGetMemberBadgeAttestation(address)
    console.log(memberBadgeAttestation)
    const {ownersPinkSlipAttestations} = useGetOwnersPinkSlipAttestations()
    const [ownersPinkSlipAttestationsPendingAssignment, setOwnersPinkSlipAttestationsPendingAssignment] = useState<OwnerPinkSlipAttestation[]>([])

    useEffect(() => {
        if (ownersPinkSlipAttestations) {
            const filtered = ownersPinkSlipAttestations.filter(ownersPinkSlipAttestation => ownersPinkSlipAttestation.licensePlate !== "0xDEAD" && ownersPinkSlipAttestation.hirePurchaseAttestationID === "0xDEAD")
            setOwnersPinkSlipAttestationsPendingAssignment(filtered)
        }
    }, [ownersPinkSlipAttestations])

    


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
                        <Fill address={address} memberBadgeAttestation={memberBadgeAttestation!} ownerPinkSlipAttestation={ownersPinkSlipAttestationsPendingAssignment[0]} getBackMemberBadgeAttestation={getBackMemberBadgeAttestation}/>
                        
                    </div>
                </div>  
                {privyUserMetadata && (
                    <div className="flex flex-col w-full justify-center items-center mt-4">
                        <div className="flex flex-col w-full max-w-[66rem] p-6 bg-white rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">User Profile Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">First Name</span>
                                    <span className="text-base">{privyUserMetadata.firstname}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Last Name</span>
                                    <span className="text-base">{privyUserMetadata.lastname}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Country</span>
                                    <span className="text-base">{privyUserMetadata.country}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {memberBadgeAttestation?.national == true && memberBadgeAttestation?.driver == true && memberBadgeAttestation?.guarantor == true && (
                    <div className="flex flex-col w-full justify-center items-center">
                        <div className="flex w-full max-w-[66rem] justify-end">
                            <div className="flex flex-col w-full max-w-[66rem] p-6 bg-white rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold mb-4">Driver Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">Driver National ID</span>
                                        <span className="text-base break-words">{memberBadgeAttestation.driverNationalID}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">Driver License ID</span>
                                        <span className="text-base break-words">{memberBadgeAttestation.driverLicenseID}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">Driver Headshot</span>
                                        <span className="text-base break-words">{memberBadgeAttestation.driverHeadshot}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">Driver Address</span>
                                        <span className="text-base break-words">{memberBadgeAttestation.driverAddress}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">Driver Phone</span>
                                        <span className="text-base break-words">{memberBadgeAttestation.driverPhone}</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold mb-4 mt-6">Guarantor Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">Guarantor National ID</span>
                                        <span className="text-base break-words">{memberBadgeAttestation.guarantorNationalID}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">Guarantor Headshot</span>
                                        <span className="text-base break-words">{memberBadgeAttestation.guarantorHeadshot}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">Guarantor Address</span>
                                        <span className="text-base break-words">{memberBadgeAttestation.guarantorAddress}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">Guarantor Phone</span>
                                        <span className="text-base break-words">{memberBadgeAttestation.guarantorPhone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            

        </main>

    )
}

