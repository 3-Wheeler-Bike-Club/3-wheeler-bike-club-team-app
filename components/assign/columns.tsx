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
import { MemberBadgeAttestation } from "@/hooks/attestation/useGetMemberBadgeAttestation";
import { trimRef } from "@/utils/trim";

export const Columns: ColumnDef<MemberBadgeAttestation>[] = [
    
    {
        accessorKey: "address",
        header: "Address",
        cell: ({row}) => {
            const address = (row.getValue("address"))
            return <div>{trimRef(address as string)}</div>
        },
    },
    {
        accessorKey: "country",
        header: "Country",
    },
    {
        accessorKey: "driver",
        header: "Driver",
        cell: ({row}) => {
            const driver = (row.getValue("driver"))
            return <div>{driver ? "Verified" : "Not Verified"}</div>
        },
    },
    {
        accessorKey: "guarantor",
        header: "Guarantor",
        cell: ({row}) => {
            const guarantor = (row.getValue("guarantor"))
            return <div>{guarantor ? "Verified" : "Not Verified"}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return <ActionCell memberBadgeAttestation={row.original} />;
        },
    },
]

function ActionCell({ memberBadgeAttestation }: { memberBadgeAttestation: MemberBadgeAttestation }) {
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
                <DropdownMenuItem onClick={() => router.push(`/assign/${memberBadgeAttestation.address}`)}>
                    Assign 3-wheeler
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}