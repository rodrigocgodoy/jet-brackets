import Image from "next/image"

import { nonPrivatePageValidation } from "@/lib/supabase/actions"
import { SignInForm } from "./components/SignInForm"

export default async function LoginPage() {
  await nonPrivatePageValidation()

  return (
    <main className="flex flex-col items-center justify-center gap-6 md:gap-[57px] bg-primary h-screen w-screen">
      <Image src="/logo.svg" alt="Logo Keirus" width={193} height={51} className="w-[105px] h-auto md:w-[133px]" />
      <SignInForm />
    </main>
  )
}
