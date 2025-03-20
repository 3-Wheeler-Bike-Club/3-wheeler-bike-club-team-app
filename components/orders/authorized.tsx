import { Menu } from "../topnav/menu";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { BadgeAlert, Caravan } from "lucide-react";
import { OffchainFleetOrder, useGetFleetOrders } from "@/hooks/offchain/useGetFleetOrders";
import { DataTable } from "./dataTable";
import { Columns } from "./columns";
import { useEffect } from "react";
import { useState } from "react";


export function Authorized() {

    const {fleetOrders} = useGetFleetOrders()
    const [fleetOrdersWithCodeZero, setFleetOrdersWithCodeZero] = useState<OffchainFleetOrder[] | null>(null)

    useEffect(() => {
        if (fleetOrders) {
            const filtered = fleetOrders.filter(order => order.status === 0)
            setFleetOrdersWithCodeZero(filtered)
        }
    }, [fleetOrders])
    

    return (
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                <Menu/>
                <div className="flex w-full justify-center">
                    <Alert className="w-full max-w-[66rem]">
                        <Caravan className="h-4 w-4" />
                        <AlertTitle className="font-bold">Register Orders!</AlertTitle>
                        <AlertDescription className="text-xs italic">
                            Manage orders, mark status code: 1 when vehicle aquired.
                        </AlertDescription>
                    </Alert>
                </div>



                <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6 items-center">
                {
                    fleetOrdersWithCodeZero == null && (
                        <div className="flex flex-col w-full gap-3 items-center">
                            <p className="font-bold">Loading...</p>
                        </div>
                    )
                }
                {
                    fleetOrdersWithCodeZero && fleetOrdersWithCodeZero?.length === 0 && (
                        <div className="flex flex-col w-full gap-3 items-center">
                                <BadgeAlert className="h-36 w-36" />
                                <p className="font-bold">No orders found</p>
                        </div>
                    )
                }
                {
                    fleetOrdersWithCodeZero && fleetOrdersWithCodeZero?.length >= 1 && (
                        <div className="flex flex-col w-full max-w-[66rem] gap-3">
                            <DataTable columns={Columns} data={fleetOrdersWithCodeZero!} />
                        </div>
                        

                    )
                }
                </div>
            </div>
            

        </main>

    )
}

