import { ColumnDef } from "@tanstack/react-table";
import { memberBadgeAttestationStatusCodes } from "@/utils/misc";
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
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {
            const statusCode = (row.getValue("status"))
            return <div>{memberBadgeAttestationStatusCodes[statusCode as keyof typeof memberBadgeAttestationStatusCodes]}</div>
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