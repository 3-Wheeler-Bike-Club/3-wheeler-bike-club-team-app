import { ColumnDef } from "@tanstack/react-table";
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
import { OwnerPinkSlipAttestation } from "@/hooks/attestation/useGetOwnerPinkSlipAttestationByInvoice";

export const Columns: ColumnDef<OwnerPinkSlipAttestation>[] = [
    {
        accessorKey: "vin",
        header: "VIN No."
    },
    {
        accessorKey: "make",
        header: "Make",
    },
    {
        accessorKey: "model",
        header: "Model",
    },
    {
        accessorKey: "year",
        header: "Year"
    },
    {
        accessorKey: "color",
        header: "Color",
    },
    {
        accessorKey: "country",
        header: "Country",
    },
    /*
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {
            const statusCode = (row.getValue("status"))
            return <div>{statusCodes[statusCode as keyof typeof statusCodes]}</div>
        },
    },
    */
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return <ActionCell ownerPinkSlipAttestation={row.original} />;
        },
    },
]

function ActionCell({ ownerPinkSlipAttestation }: { ownerPinkSlipAttestation: OwnerPinkSlipAttestation }) {
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
                <DropdownMenuItem onClick={() => router.push(`/register/${ownerPinkSlipAttestation.vin}`)}>
                    Register 3-Wheeler
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}