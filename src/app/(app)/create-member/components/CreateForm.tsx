"use client"

import { useTransition } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoaderCircle } from "lucide-react"
import { RedirectType, redirect } from "next/navigation"

import { createMember, updateMember } from "../actions"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Database } from "@/lib/supabase/type"

const FormSchema = z
	.object({
		firstName: z.string({
      required_error: "Error test"
    }),
		lastName: z.string(),
		email: z.string().email(),
	})

export function MemberForm({ dataUser }: { dataUser?: Database["public"]["Tables"]["member"]["Row"] }) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
    values: {
      firstName: dataUser?.display_name?.split(" ")[0] ?? "",
      lastName: (dataUser && dataUser?.display_name?.replace(dataUser?.display_name?.split(" ")[0], "").trim()) ?? "",
      email: dataUser?.email ?? "",
    }
	})

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      let result

      if (dataUser?.id) {
        result = await updateMember(dataUser.id, data)
      } else {
        result = await createMember(data)
      }

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
							<code className="text-white">Team Member {dataUser?.id ? "updated" : "created"}!</code>
						</pre>
          ),
        })

        redirect("/team-members", RedirectType.replace)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 md:gap-[29px]">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 md:gap-3 max-w-[521px] w-full">
              <FormLabel className="text-base md:text-lg font-medium">
                First name
              </FormLabel>
              <FormControl>
                <Input placeholder="Type your first name" type="text" {...field} onChange={field.onChange} className="rounded-[5px] min-h-[48px] md:min-h-[56px] p-2 flex items-center text-black border-2 border-[#D9D9D9]" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 md:gap-3 max-w-[521px] w-full">
              <FormLabel className="text-base md:text-lg font-medium">
                Last name
              </FormLabel>
              <FormControl>
                <Input placeholder="Type your last name" type="text" {...field} onChange={field.onChange} className="rounded-[5px] min-h-[48px] md:min-h-[56px] p-2 flex items-center text-black border-2 border-[#D9D9D9]" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 md:gap-3 max-w-[521px] w-full">
              <FormLabel className="text-base md:text-lg font-medium">
                Email
              </FormLabel>
              <FormControl>
                <Input placeholder="Type your e-mail" type="text" {...field} onChange={field.onChange} className="rounded-[5px] min-h-[48px] md:min-h-[56px] p-2 flex items-center text-black border-2 border-[#D9D9D9]" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="rounded-[5px] flex justify-center gap-1 py-[30px] bg-black text-white text-base font-medium max-w-[521px] w-full"
        >
          {dataUser?.id ? "Update member" : "Create and send invite"}
          <LoaderCircle
						className={cn("animate-spin", { hidden: !isPending })}
					/>
        </Button>
      </form>
    </Form>
  )
}