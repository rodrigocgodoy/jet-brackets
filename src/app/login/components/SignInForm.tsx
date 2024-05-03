"use client"

import { useTransition } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoaderCircle } from "lucide-react"

import { signIn } from "../actions"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { RedirectType, redirect } from "next/navigation"

const FormSchema = z
	.object({
		email: z.string().email(),
		password: z.string(),
	})

export function SignInForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	})

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const result = await signIn(data)

      const resultParse = JSON.parse(result)

      if (resultParse.error?.message) {
        toast({
          title: "Fail to login",
					description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">{resultParse.error.message}</code>
						</pre>
					),
				})
      } else {
        toast({
          title: "Successfully",
					description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">Successfully login</code>
						</pre>
          ),
        })
      }

      redirect("/team-members", RedirectType.replace)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 py-9 md:py-[81px] px-6 md:px-[72px] mx-6 md:m-0 bg-white rounded-[10px] max-w-[664px] w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 md:gap-[11px] max-w-[521px] w-full">
              <FormLabel className="text-base md:text-lg font-medium">
                Email
              </FormLabel>
              <FormControl>
                <Input placeholder="Type your first name" type="email" {...field} onChange={field.onChange} className="rounded-[5px] min-h-[60px] md:min-h-[80px] p-2 flex items-center text-black border-2 border-[#D9D9D9]" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 md:gap-[11px] max-w-[521px] w-full">
              <FormLabel className="text-base md:text-lg font-medium">
                Password
              </FormLabel>
              <FormControl>
                <Input placeholder="Type your password" type="password" {...field} onChange={field.onChange} className="rounded-[5px] min-h-[60px] md:min-h-[80px] p-2 flex items-center text-black border-2 border-[#D9D9D9]" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="rounded-[5px] flex justify-center py-[30px] bg-black text-white text-base font-medium max-w-[521px] w-full"
          disabled={isPending}
        >
          Login to Keirus admin
          <LoaderCircle
						className={cn("animate-spin", { hidden: !isPending })}
					/>
        </Button>
      </form>
    </Form>
  )
}
