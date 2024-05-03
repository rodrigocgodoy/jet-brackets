"use client"

import {
  MoreHorizontal,
} from "lucide-react"
import { useEffect, useState, useTransition } from "react"
import Link from "next/link"

import { Database } from "@/lib/supabase/type"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { TableCell, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { deleteMember } from "../actions"

export function DataItem({ item }: { item: Database["public"]["Tables"]["member"]["Row"] }) {
  const [isPending, startTransition] = useTransition()
  const [openDialog, setOpenDialog] = useState(false)

  const abbreviation = `${item?.display_name!.split(" ")[0][0]}${item?.display_name!.split(" ")[1][0]}`
  const dateCreated = new Date(item.created_at)
  const dateUpdated = new Date(item.updated_at)
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  function onSubmit() {
    startTransition(async () => {
      const result = await deleteMember(item.id)

      const { error } = JSON.parse(result)

      if (error?.message) {
        toast({
          title: "Fail to create member",
					description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">{error.message}</code>
						</pre>
					),
				})
      } else {
        toast({
          title: "Successfully",
					description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">Team Member deleted!</code>
						</pre>
          ),
        })
      }
    })
  }

  useEffect(() => {
    if (isPending) {
      setOpenDialog(true)
    } else {
      setOpenDialog(false)
    }
  }, [isPending])

  return (
    <TableRow>
      <TableCell className="font-medium flex items-center gap-4 p-[13px]">
        <Avatar>
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback>{abbreviation}</AvatarFallback>
        </Avatar>
        {item?.display_name}
      </TableCell>
      <TableCell className="hidden md:table-cell p-[13px]">
        {item?.email}
      </TableCell>
      <TableCell className="hidden md:table-cell p-[13px]">
        {formatter.format(dateCreated)}
      </TableCell>
      <TableCell className="hidden md:table-cell p-[13px]">
        {formatter.format(dateUpdated)}
      </TableCell>
      <TableCell>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="icon"
              variant="ghost"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/create-member/${item.id}`} className="w-full">
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenDialog((prevState) => !prevState)} className="cursor-pointer">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog onOpenChange={() => setOpenDialog((prevState) => !prevState)} open={openDialog}>
          <AlertDialogContent className="px-[46px] py-[52px] gap-[21px]">
            <AlertDialogHeader className="gap-[21px]">
              <AlertDialogTitle className="text-[26px] font-medium text-black m-0">
                Are you sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-[#838383] text-[23px] !m-0">
                Reversing this action is not possible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex !flex-col gap-[21px]">
              <Button
                type="submit"
                onClick={onSubmit}
                disabled={isPending}
                className="!m-0 bg-black text-white !py-[30px] text-base leading-4 font-medium"
              >
                Yes, Please delete member
              </Button>
              <Button
                disabled={isPending}
                className="!m-0 bg-[#EEEEEE] text-[#424242] !py-[30px] text-base leading-4 font-medium hover:bg-[#EEEEE2]"
                onClick={() => setOpenDialog((prevState) => !prevState)}
              >
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}
