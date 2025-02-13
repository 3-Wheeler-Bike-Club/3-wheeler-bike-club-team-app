import { Menu } from "../topnav/menu";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Caravan } from "lucide-react";
import { useGetFleetOrders } from "@/hooks/offchain/useGetFleetOrders";
import { DataTable } from "./dataTable";
import { Columns } from "./columns";


export function Authorized() {

    const {fleetOrders} = useGetFleetOrders()
    console.log(fleetOrders)
    

    return (
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                <Menu/>
                <div className="flex w-full justify-center">
                    <Alert className="w-full max-w-[66rem]">
                        <Caravan className="h-4 w-4" />
                        <AlertTitle className="font-bold">New Orders!</AlertTitle>
                        <AlertDescription className="text-xs italic">
                            Manage orders, mark status code: 1 when vehicle aquired.
                        </AlertDescription>
                    </Alert>
                </div>



                <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6 items-center">
                {
                    fleetOrders && fleetOrders?.length >= 1 && (
                        <div className="flex flex-col w-full max-w-[66rem] gap-3">
                            <DataTable columns={Columns} data={fleetOrders!} />
                        </div>
                        

                    )
                }
                </div>
            </div>
            

        </main>

    )
}

