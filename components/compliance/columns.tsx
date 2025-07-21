import { ColumnDef } from "@tanstack/react-table";
import { memberBadgeAttestationStatusCodes } from "@/utils/constants/misc";
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
import { trimRef } from "@/utils/trim";


interface Profile {
    address: `0x${string}`
    email: string
    phone: string
    firstname: string
    othername: string
    lastname: string
    id: string
    files: string[]
}

export const Columns: ColumnDef<Profile>[] = [
    
    {
        accessorKey: "address",
        header: "Address",
        cell: ({row}) => {
            const address = (row.getValue("address"))
            return <div>{trimRef(address as string)}</div>
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "firstname",
        header: "Firstname",
    },
    {
        accessorKey: "othername",
        header: "Othername",
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
            return <ActionCell profile={row.original} />;
        },
    },
]

function ActionCell({ profile }: { profile: Profile }) {
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
                <DropdownMenuItem onClick={() => router.push(`/compliance/${profile.address}`)}>
                    View Investor Profile
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}