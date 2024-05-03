import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Database } from "@/lib/supabase/type"
import { DataItem } from "./DataItem"

export function DataTable({ data }: { data: Database["public"]["Tables"]["member"]["Row"][] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="!border-0">
          <TableHead className="pl-[15px]">Name</TableHead>
          <TableHead className="hidden md:table-cell pl-[15px]">
            Email
          </TableHead>
          <TableHead className="hidden md:table-cell pl-[15px]">
            Created date
          </TableHead>
          <TableHead className="hidden md:table-cell pl-[15px]">
            Last access
          </TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-y-scroll">
        {data?.map((item: Database["public"]["Tables"]["member"]["Row"]) => 
          <DataItem key={item.id} item={item} />
        )}
      </TableBody>
    </Table>
  )
}
