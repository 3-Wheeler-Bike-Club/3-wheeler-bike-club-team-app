import { updateProfileComplianceAction } from "@/app/actions/kyc/updateProfileComplianceAction"
import { sendProfileVerifiedMail } from "@/app/actions/mail/sendProfileVerifiedMail"
import { setCompliance } from "@/app/actions/setCompliance"
import { Menu } from "@/components/topnav/menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetProfile } from "@/hooks/kyc/useGetProfile"
import { fleetOrderBookAbi } from "@/utils/abis/fleetOrderBook"
import { publicClient, walletClient } from "@/utils/client"
import { fleetOrderBook } from "@/utils/constants/addresses"
import { trimRef } from "@/utils/trim"
import { useQueryClient } from "@tanstack/react-query"
import { ArrowLeft, Loader2, UserRoundCheck, User, Mail, FileText, CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useBlockNumber, useReadContract } from "wagmi"

interface AuthorizedProps {
    address: string
}



export function Authorized({ address }: AuthorizedProps) {
    const { profile, loading: profileLoading } = useGetProfile(address as `0x${string}`)
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const compliantQueryClient = useQueryClient()
    
    const { data: blockNumber } = useBlockNumber({ watch: true })  


    const { data: compliant, isLoading: compliantLoading, queryKey: compliantQueryKey } = useReadContract({
        address: fleetOrderBook,
        abi: fleetOrderBookAbi,
        functionName: "isCompliant",
        args: [address as `0x${string}`],
    })
    useEffect(() => { 
        compliantQueryClient.invalidateQueries({ queryKey: compliantQueryKey }) 
    }, [blockNumber, compliantQueryClient, compliantQueryKey]) 


    async function handleApprovedCompliance() {
        setLoading(true)
        try {
            // set compliance to true
            const tx = await setCompliance(address as `0x${string}`)
            const receipt = await publicClient.waitForTransactionReceipt({ hash: tx })
            console.log(receipt)
            if (receipt.status === "success") {
                // update profile
                const updatedProfile = await updateProfileComplianceAction(address as `0x${string}`)
                console.log(updatedProfile)
                if (updatedProfile && profile) {
                    // send email to user
                    const email = await sendProfileVerifiedMail(profile?.email, profile?.firstname)
                    setLoading(false)
                }
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }           
    }


    async function handleRejectedCompliance() {
        setLoading(true)
        try {
            // set compliance to false
        } catch (error) {
            console.log(error)
            setLoading(false)
        }           
    }

    console.log(profile)
    return (
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                <Menu/>

                <div className="flex flex-col w-full justify-center items-center">
                    <div className="flex w-full max-w-[66rem] items-center">
                        <ArrowLeft className="h-8 w-8 cursor-pointer" onClick={() =>  router.push("/compliance")}/>
                    </div>
                </div>
                
                {/* Profile Details Component */}
                {
                    profileLoading || compliantLoading
                    ?(
                        <>
                            <div className="flex flex-col w-full justify-center items-center">
                                <div className="flex w-full max-w-[66rem] justify-center">
                                    <Card className="w-full">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                Loading Profile...
                                            </CardTitle>
                                        </CardHeader>
                                    </Card>
                                </div>
                            </div>
                        </>
                    ) 
                    :(
                        <>
                            <div className="flex flex-col w-full justify-center items-center">
                                <div className="flex w-full max-w-[66rem] justify-center">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                        {/* Personal Information Card */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <User className="h-5 w-5" />
                                                    Personal Information
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-gray-500">Full Name</span>
                                                        <span className="text-base font-medium">
                                                            {profile?.firstname} {profile?.othername && `${profile?.othername} `}{profile?.lastname}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-gray-500">ID Type</span>
                                                        <span className="text-base font-medium capitalize">
                                                            {profile?.id}
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Contact Information Card */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <Mail className="h-5 w-5" />
                                                    Contact Information
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-gray-500">Email Address</span>
                                                        <span className="text-base font-medium break-words">{profile?.email}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-gray-500">Phone Number</span>
                                                        <span className="text-base font-medium">{profile?.phone}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Wallet Information Card */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <FileText className="h-5 w-5" />
                                                    Wallet Information
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-gray-500">Wallet Address</span>
                                                        <span className="text-base font-medium font-mono break-words">
                                                            {trimRef(profile?.address)}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-gray-500">Compliance Status</span>
                                                        <div className="flex items-center gap-2">
                                                            {profile?.compliant ? (
                                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                            ) : (
                                                                <XCircle className="h-5 w-5 text-red-500" />
                                                            )}
                                                            <span className={`text-base font-medium ${profile?.compliant ? 'text-green-600' : 'text-red-600'}`}>
                                                                {profile?.compliant ? 'Compliant' : 'Non-Compliant'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Files Information Card */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <FileText className="h-5 w-5" />
                                                    Documents & Files
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-gray-500">Number of Files</span>
                                                        <span className="text-base font-medium">{profile?.files?.length || 0} files</span>
                                                    </div>
                                                    {profile?.files && profile?.files.length > 0 && (
                                                        <div className="flex flex-col">
                                                            <span className="text-sm text-gray-500">File References</span>
                                                            <div className="flex flex-col space-y-2">
                                                                {profile?.files.map((file: string, index: number) => (
                                                                    <a 
                                                                        key={index} 
                                                                        href={file} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="text-xs font-mono break-words text-blue-600 hover:text-blue-800 underline cursor-pointer"
                                                                    >
                                                                        {trimRef(file, 8, 8)}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </>
                    )

                }
                
                <div className="flex flex-col w-full justify-center items-center">
                    <div className="flex w-full max-w-[66rem] justify-end">
                        <Button variant="outline" onClick={handleApprovedCompliance} disabled={loading || compliant}>
                            {
                                loading
                                ? <Loader2 className="h-8 w-8 animate-spin" />
                                : <UserRoundCheck className="h-8 w-8" />
                            }
                            {
                                compliant
                                ? <p className="text-lg font-bold">Compliant</p>
                                : <p className="text-lg font-bold">Verify Investor</p>
                            }
                        </Button>
                    </div>
                </div>  

                
                
            </div>
        </main>
    )
}