import { Menu } from "../../topnav/menu";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { OffchainFleetOrder } from "@/hooks/offchain/useGetFleetOrders";
import { statusCodes } from "@/utils/misc";
import { Refund } from "./refund";
import { Fill } from "./fill";

interface AuthorizedProps {
    order: OffchainFleetOrder
}

export function Authorized({ order }: AuthorizedProps) {

    console.log(order)
    
    const router = useRouter()
    
    
    const statusText = statusCodes[order.status as keyof typeof statusCodes]

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
                    <div className="flex w-full max-w-[66rem] gap-4 mt-8 justify-end">
                        <Fill/>
                        <Refund/>
                    </div>

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

