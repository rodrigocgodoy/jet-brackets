import Link from "next/link"

import { readUser } from "@/lib/supabase/actions"
import { Sidebar } from "@/components/sidebar"
import { getMembers } from "./actions"
import { DataTable } from "./components/DataTable"
import Image from "next/image"

export default async function Members() {
  const { data: { user } } = await readUser()
  const role = user?.user_metadata?.role || 'user'

  const isAdmin = (role || "") === "admin"

  const result = await getMembers()
  const resultParse = JSON.parse(result)
  const { data, count } = resultParse

  return (
    <main className="flex flex-col md:flex-row min-h-screen max-h-screen overflow-hidden">
      <Sidebar />
      <div className="bg-[#F6F6F9] flex flex-col flex-1 h-screen max-h-screen overflow-scroll">
        <header className="flex flex-col gap-[17px] bg-white p-6 md:py-[30px] md:px-[38px]">
          <div className="flex justify-between">
            <span className="text-[18px] md:text-[33px] font-bold text-black flex items-center gap-[10px]">
              <Image src="/detail-header.svg" alt="Image illustration detail" width={16} height={21} />Team members
            </span>
            {isAdmin && (
              <Link href="/create-member" className="border border-black border-solid text-[16px] md:text-[19px] text-black font-semibold rounded-[5px] duration-500 py-2 px-4 hover:bg-black hover:text-white">
                + Add member
              </Link>
            )}
          </div>
          <span className="text-[16px] md:text-[23px] text-[#838383]">
            {`${count} member${count! <= 1 ? "" : "s"}`}
          </span>
        </header>

        <div className="bg-white m-6 md:mx-[34px] md:my-[45px] rounded-[10px] p-6 md:py-[49px] md:px-5 overflow-x-scroll h-full relative">
          <DataTable data={data} />
        </div>

        <footer className="mx-6 md:mx-[34px] mb-0 md:mb-[48px] py-6 md:pt-5 border-t border-t-[#E7E3E5]">
          <h1 className="text-sm text-primary font-medium">
            Keirus
          </h1>
        </footer>
      </div>
    </main>
  )
}
