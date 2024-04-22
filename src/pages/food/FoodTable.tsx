import { ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import Picture from "../../images/cover/cover-01.png"
import React, { useState } from "react"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Food } from "@/types/food"
import { Pagination } from "../Pagination"

export const columns:ColumnDef<Food>[] = [
    {
        header: 'image',
        id: "image",
        cell: () => {
            return (
                <img id="image" src={Picture} width={64} height={64} className="aspect-square rounded-md object-cover" alt="" />
            )
        }
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
        accessorKey: 'type',
        header: 'type',
        cell: ({ row }) => {
            const foodType = row.getValue("type") as string;
            return (
                <Badge className="text-white dark:text-black dark:bg-purple">{foodType}</Badge>
            );
        }
    },
    {
        accessorKey: "rating",
        header: "Rating"
    },
    {
        accessorKey: "totalOrder",
        header: "Total Order"
    },
    {
        accessorKey: 'interest',
        header: 'Interest',
        cell: ({row}) => {
            const styled = `${row.getValue("interest")}%`
            return <div className="font-bold text-primary dark:text-purple">{styled}</div>
        }
    }
]

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function FoodTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>){
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const handleClick = (foodId: Food) => {
        window.location.href = `/food/${foodId}`;
    };

    const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), 
    onSortingChange: setSorting, getSortedRowModel: getSortedRowModel(), onColumnFiltersChange: setColumnFilters, getFilteredRowModel: getFilteredRowModel(), onColumnVisibilityChange: setColumnVisibility, onRowSelectionChange: setRowSelection, state: {sorting, columnFilters, columnVisibility, rowSelection}})

  return (
  <div className="flex min-h-screen w-full flex-col overflow-x-auto bg-white/40 dark:bg-boxdark/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <Tabs defaultValue="all">
                  <div className="flex items-center">
                      <div className="ml-auto flex items-center gap-2 ">
                          <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="outline" className="ml-auto">
                                      Columns
                                  </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                  {table.getAllColumns().filter((col) => col.getCanHide()).map((col) => {
                                  return(
                                  <DropdownMenuCheckboxItem key={col.id} className="capitalize dark:bg-boxdark bg-white"
                                      checked={col.getIsVisible()} onCheckedChange={(value)=>
                                      col.toggleVisibility(!!value)}
                                      >
                                      {col.id}
                                  </DropdownMenuCheckboxItem>
                                  )
                                  })}
                              </DropdownMenuContent>
                          </DropdownMenu>
                      </div>
                  </div>
                  <TabsContent value="all">
                      <Card x-chunk="dashboard-06-chunk-0" className="bg-white dark:bg-boxdark">
                          <CardHeader>
                              <CardTitle>Food</CardTitle>
                              <CardDescription>
                                  View our foods and their sales performance.
                              </CardDescription>
                          </CardHeader>
                          <CardContent>
                              <Table>
                                  <TableHeader>
                                      {table.getHeaderGroups().map((headerGroup) => (
                                      <TableRow key={headerGroup.id}>
                                          {headerGroup.headers.map((header) => {
                                          return(
                                          <TableHead key={header.id}>
                                              {header.isPlaceholder ? null :
                                              flexRender(header.column.columnDef.header, header.getContext())}
                                          </TableHead>
                                          )
                                          })}
                                      </TableRow>
                                      ))}
                                  </TableHeader>
                                  <TableBody>
                                      {table.getRowModel().rows?.length ? (
                                      table.getRowModel().rows.map((row) => (
                                        <TableRow className="cursor-pointer" onClick={() => handleClick(row.original.id)} key={row.id} data-state={row.getIsSelected() && "selected"}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
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
                          </CardContent>
                          <CardFooter>
                          </CardFooter>
                      </Card>
                  </TabsContent>
              </Tabs>
              <div className="flex items-center justify-end space-x-2 p-4">
                  <Pagination table={table} />
              </div>
          </main>
      </div>
  </div>
  )
}

export default FoodTable