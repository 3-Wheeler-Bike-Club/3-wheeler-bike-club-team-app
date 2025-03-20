import { ColumnDef } from "@tanstack/react-table";
import { OffchainFleetOrder } from "@/hooks/offchain/useGetFleetOrders";
import { statusCodes } from "@/utils/constants/misc";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export const Columns: ColumnDef<OffchainFleetOrder>[] = [
    {
        accessorKey: "invoice",
        header: "Invoice No."
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "tender",
        header: "Pay Method",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {
            const statusCode = (row.getValue("status"))
            return <div>{statusCodes[statusCode as keyof typeof statusCodes]}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return <ActionCell order={row.original} />;
        },
    },
]

function ActionCell({ order }: { order: OffchainFleetOrder }) {
    const router = useRouter();
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(`/orders/${order.invoice}`)}>
                    View Order
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}