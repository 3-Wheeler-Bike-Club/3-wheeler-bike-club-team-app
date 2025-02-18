import { Menu } from "../../topnav/menu";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { OffchainFleetOrder } from "@/hooks/offchain/useGetFleetOrders";
import { statusCodes } from "@/utils/misc";
import { Refund } from "./refund";
import { Fill } from "./fill";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { postOwnerPinkSlipAttestationAction } from "@/app/actions/attestation/postOwnerPinkSlipAttestationAction";
import { postFleetOrderAction } from "@/app/actions/offchain/postFleetOrderAction";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useGetOwnerPinkSlipAttestationByInvoice } from "@/hooks/attestation/useGetOwnerPinkSlipAttestationByInvoice";

interface AuthorizedProps {
    order: OffchainFleetOrder
}

export interface OwnerPinkSlipAttestations {
    addresses: string[];
    invoices: string[];
    hirePurchaseAttestationIDs: string[];
    ownerPinkSlipAttestationIDs: string[];
    vins: string[];
    makes: string[];
    models: string[];
    years: string[];
    colors: string[];
    countries: string[];
    licensePlates: string[];
    visualProofs: string[][];
    ownerProofs: string[];
    transferProofs: string[];
}

export function Authorized({ order }: AuthorizedProps) {

    console.log(order)

    const {ownerPinkSlipAttestationByInvoice, getBackOwnerPinkSlipAttestationByInvoice} = useGetOwnerPinkSlipAttestationByInvoice(order.invoice)
    
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    
    const [ownerPinkSlipAttestations, setOwnerPinkSlipAttestations] = useState<OwnerPinkSlipAttestations | null>(null)
    console.log(ownerPinkSlipAttestations)

    const statusText = statusCodes[order.status as keyof typeof statusCodes]


  async function handleOrderFilling() {
    setLoading(true)
    try {
        if (ownerPinkSlipAttestations) {
            const defaultOwnerPinkSlipAttestationIDs: string[] = []
        
    
            const res = await postOwnerPinkSlipAttestationAction(
                ownerPinkSlipAttestations?.addresses,
                ownerPinkSlipAttestations?.invoices,
                ownerPinkSlipAttestations?.hirePurchaseAttestationIDs,
                ownerPinkSlipAttestations?.ownerPinkSlipAttestationIDs,
                ownerPinkSlipAttestations?.vins,
                ownerPinkSlipAttestations?.makes,
                ownerPinkSlipAttestations?.models,
                ownerPinkSlipAttestations?.years,
                ownerPinkSlipAttestations?.colors,
                ownerPinkSlipAttestations?.countries,
                ownerPinkSlipAttestations?.licensePlates,
                ownerPinkSlipAttestations?.visualProofs,
                ownerPinkSlipAttestations?.ownerProofs,
                ownerPinkSlipAttestations?.transferProofs
            )
            getBackOwnerPinkSlipAttestationByInvoice()
            if (res && ownerPinkSlipAttestations?.ownerPinkSlipAttestationIDs) {
                for (let i = 0; i < ownerPinkSlipAttestations?.ownerPinkSlipAttestationIDs?.length; i++) {
                    defaultOwnerPinkSlipAttestationIDs.push(ownerPinkSlipAttestations?.ownerPinkSlipAttestationIDs?.[i])
                }
                postFleetOrderAction(
                    undefined,
                    order.invoice,
                    undefined,
                    undefined,
                    undefined,
                    1,
                    defaultOwnerPinkSlipAttestationIDs
                )
            }
            setOwnerPinkSlipAttestations(null)
            setLoading(false)
        }
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
    
    console.log("submit")
  }

    return (
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                <Menu/>
                <div className="flex flex-col w-full justify-center items-center">
                    <div className="flex w-full max-w-[66rem] items-center">
                        <ArrowLeft className="h-8 w-8" onClick={() => router.push("/orders")}/>
                    </div>
                    <div className="flex w-full max-w-[66rem] justify-center">
                        <p className="text-2xl italic">Order: <span className="text-2xl not-italic font-bold">{order.invoice}</span></p>
                    </div>
                </div>
                
                <div className="flex flex-col w-full justify-center items-center">
                    {
                        ownerPinkSlipAttestationByInvoice && ownerPinkSlipAttestationByInvoice.length === 0 && (
                            <div className="flex w-full max-w-[66rem] gap-4 mt-8 justify-end">
                                {
                                    ownerPinkSlipAttestations?.vins?.length === order.amount ? 
                                    (
                                        <Button onClick={handleOrderFilling} variant="outline">
                                            {
                                                loading
                                                ? (
                                                    <>
                                                        <motion.div
                                                        initial={{ rotate: 0 }} // Initial rotation value (0 degrees)
                                                        animate={{ rotate: 360 }} // Final rotation value (360 degrees)
                                                        transition={{
                                                            duration: 1, // Animation duration in seconds
                                                            repeat: Infinity, // Infinity will make it rotate indefinitely
                                                            ease: "linear", // Animation easing function (linear makes it constant speed)
                                                        }}
                                                    >
                                                            <DotsHorizontalIcon/>
                                                        </motion.div>
                                                    </>
                                                )
                                                : (
                                                    <>
                                                        <Plus className="h-4 w-4"/>
                                                        Register Fleet
                                                    </>
                                                )
                                            }
                                            
                                        </Button>
                                    )
                                    :(
                                        <Fill order={order} ownerPinkSlipAttestations={ownerPinkSlipAttestations} setOwnerPinkSlipAttestations={setOwnerPinkSlipAttestations}/>
                                    )
                                }
                                
                                <Refund/>
                            </div>
                    
                        )
                    }
                    {ownerPinkSlipAttestationByInvoice && (
                    <div className="flex w-full max-w-[66rem] justify-center items-center">
                        <div className="flex flex-col w-full gap-4">
                            {ownerPinkSlipAttestationByInvoice.map((ownerPinkSlipsAttestation) => (
                                <div key={ownerPinkSlipsAttestation.vin} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full gap-4 p-6 rounded-lg bg-gray-50">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-gray-600">VIN</p>
                                        <p className="font-medium truncate">{ownerPinkSlipsAttestation.vin}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-gray-600">Make</p>
                                        <p className="font-medium truncate">{ownerPinkSlipsAttestation.make}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-gray-600">Model</p>
                                        <p className="font-medium truncate">{ownerPinkSlipsAttestation.model}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-gray-600">Year</p>
                                        <p className="font-medium truncate">{ownerPinkSlipsAttestation.year}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-gray-600">Color</p>
                                        <p className="font-medium truncate">{ownerPinkSlipsAttestation.color}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-gray-600">Country</p>
                                        <p className="font-medium truncate">{ownerPinkSlipsAttestation.country}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    )}    
                    {ownerPinkSlipAttestations && ownerPinkSlipAttestations.vins && ownerPinkSlipAttestations.vins.length > 0 && (
                        <div className="flex w-full  max-w-[66rem] justify-center items-center">
                            <div className="flex flex-col w-full max-w-[66rem] gap-4">
                                {ownerPinkSlipAttestations.vins.map((vin, index) => (
                                    <div key={index} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full gap-4 p-6 rounded-lg bg-gray-50">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm text-gray-600">VIN</p>
                                            <p className="font-medium truncate">{vin}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm text-gray-600">Make</p>
                                            <p className="font-medium truncate">{ownerPinkSlipAttestations.makes?.[index]}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm text-gray-600">Model</p>
                                            <p className="font-medium truncate">{ownerPinkSlipAttestations.models?.[index]}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm text-gray-600">Year</p>
                                            <p className="font-medium truncate">{ownerPinkSlipAttestations.years?.[index]}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm text-gray-600">Color</p>
                                            <p className="font-medium truncate">{ownerPinkSlipAttestations.colors?.[index]}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm text-gray-600">Country</p>
                                            <p className="font-medium truncate">{ownerPinkSlipAttestations.countries?.[index]}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col w-full max-w-[66rem] gap-4 mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2 p-6 rounded-lg bg-gray-50">
                                <h3 className="text-lg font-semibold">Order Details</h3>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-gray-600">Invoice Number</p>
                                    <p className="font-medium">{order.invoice}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-gray-600">Status</p>
                                    <p className="font-medium">{statusText}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-gray-600">Created At</p>
                                    <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 p-6 rounded-lg bg-gray-50">
                                <h3 className="text-lg font-semibold">Customer Information</h3>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-gray-600">Wallet Address</p>
                                    <p className="font-medium">{order.address}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-gray-600">Reference</p>
                                    <p className="font-medium">{order.reference}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 p-6 rounded-lg bg-gray-50">
                                <h3 className="text-lg font-semibold">Payment Details</h3>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-gray-600">Amount</p>
                                    <p className="font-medium">{order.amount}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-gray-600">Payment Method</p>
                                    <p className="font-medium">{order.tender}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

