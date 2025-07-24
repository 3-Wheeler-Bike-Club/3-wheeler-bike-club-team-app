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
import { trimRef } from "@/utils/trim";
import { Profile } from "@/hooks/kyc/useGetProfile";


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
        accessorKey: "lastname",
        header: "Lastname",
    },
    {
        accessorKey: "compliant",
        header: "Compliant",
        cell: ({row}) => {
            const compliant = (row.getValue("compliant"))
            return <div>{compliant ? "Compliant" : "Non-Compliant"}</div>
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