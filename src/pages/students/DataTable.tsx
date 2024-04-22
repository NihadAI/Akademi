import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, SortingState, ColumnFiltersState, getFilteredRowModel, VisibilityState } from "@tanstack/react-table"
import { ArrowUpDown, Mail, MoreHorizontal, Phone, Plus } from "lucide-react"
import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Pagination } from "../Pagination"
import { Checkbox } from "@/components/ui/checkbox"
import { Students } from "@/types/students"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export const columns: ColumnDef<Students>[] = [
    {
        id:"select",
        header: ({table}) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomeRowsSelected() && "indeterminate")} 
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox 
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="row selection"
            />
        ),
        enableHiding: false,
        enableSorting: false
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <Button className="p-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "id",
        header: "ID",
        cell: ({row}) => {
            const styled = `#${row.getValue("id")}`
            return <div className="font-bold text-purple">{styled}</div>
        }
    },
    {
        accessorKey: "time",
        header: 'Time'
    },
    {
        accessorKey: "parent_name",
        header: "Parent Name"
    },
    {
        accessorKey: "city",
        header: "City"
    },
    {
        accessorKey: "grade",
        header: "Grade"
    },
    {
        accessorKey: "phone",
        header: "Contact",
        cell: ({row}) => {
          const student = row.original
            return(
                <div className="flex items-center gap-3">
                    <Link to="#" type="phone"
                        onClick={() => navigator.clipboard.writeText(student.phone)}
                        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-purple dark:border-strokedark dark:bg-meta-4 dark:text-white">
                    <Phone />
                    </Link>
                    <Link to="#" type="email"                        
                        onClick={() => navigator.clipboard.writeText(student.email)}
                        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-purple dark:border-strokedark dark:bg-meta-4 dark:text-white">
                    <Mail />
                    </Link>
                </div>
            )
        }
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
          const student = row.original
          const id = student.id
          
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-meta-4" align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem className="hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(student.id?.toString() || '')}
                >
                  Copy student ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <NavLink to={`/students/${id}`}><DropdownMenuItem className="hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer">View student</DropdownMenuItem></NavLink>
                <NavLink to={`/students/edit/${id}`}><DropdownMenuItem className="hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer">Edit student</DropdownMenuItem></NavLink>
                <DropdownMenuItem className="hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer">View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      }
]

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onDelete: (studentId: string) => void
}

export function DataTable<TData extends {id: string}, TValue>({columns, data, onDelete}: DataTableProps<TData, TValue>){
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), 
    onSortingChange: setSorting, getSortedRowModel: getSortedRowModel(), onColumnFiltersChange: setColumnFilters, getFilteredRowModel: getFilteredRowModel(), onColumnVisibilityChange: setColumnVisibility, onRowSelectionChange: setRowSelection, state: {sorting, columnFilters, columnVisibility, rowSelection}})

    return(
        <div className="rounded-lg border bg-white dark:bg-black dark:border-meta-4">
            <div className="flex items-center m-4">
                <Input placeholder="Filter names..." 
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)} 
                className="max-w-full outline-none mr-4" />
                <Link to={"addNew"}>
                    <Button variant="outline" className="mr-4 capitalize bg-purple text-white hover:bg-primary ">
                        <span><Plus /></span>
                        <span className="hidden sm:inline">add new student</span>
                    </Button>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        Columns
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table.getAllColumns().filter((col) => col.getCanHide()).map((col) => {
                            return(
                                <DropdownMenuCheckboxItem
                                key={col.id}
                                className="capitalize dark:bg-boxdark bg-white"
                                checked={col.getIsVisible()}
                                onCheckedChange={(value) => col.toggleVisibility(!!value)}
                                >
                                    {col.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return(
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null :  flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            ))}
                             <TableCell>
                                <AlertDialog>
                                <AlertDialogTrigger asChild>
                                <Button className="bg-purple dark:bg-boxdark text-white">
                                     Delete
                                 </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete and remove the data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="bg-purple text-white" onClick={()=> onDelete(row.original.id)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                </AlertDialog>
                             </TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 p-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <Pagination table={table} />
            </div>
        </div>
    )
}
