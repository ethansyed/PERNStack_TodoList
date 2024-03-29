"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ListItem = {
    todo_id: number
    description: string
}

async function deleteItem(todoId: number) {
    try {
        await fetch(`http://localhost:5001/todos/${todoId.toString()}`, {
            method: "DELETE"
        })
    } catch (err) {
        let message;
        if (err instanceof Error) message = err.message;
        else message = String(err);
        console.log(message);
    }
}

async function updateItem(todoId: number) {
    try {
        const response = await fetch(`http://localhost:5001/todos/${todoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        })

    } catch (err) {
        let message;
        if (err instanceof Error) message = err.message;
        else message = String(err);
        console.log(message);
    }
}

export const columns: ColumnDef<ListItem>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "description",
        header: () => <div className="mx-4 text-left">Descripton</div>,
        cell: ({ row }) => {
            const item = row.original;
            return (
                <div className="mx-4 text-left">{item.description}</div>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const item = row.original
            const { toast } = useToast()

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard.writeText(item.todo_id.toString())
                                toast({
                                    description: "ID Copied!",
                                    className: 'text-center'
                                })
                            }
                            }
                        >
                            Copy to-do ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {

                            }}
                        >
                            Edit to-do item
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                deleteItem(item.todo_id);
                                toast({
                                    variant: "destructive",
                                    description: "Item Deleted!",
                                    className: 'text-center'
                                })
                            }}
                        >Delete to-do item</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
