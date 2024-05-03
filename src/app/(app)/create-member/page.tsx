"use server"

import { Sidebar } from "@/components/sidebar"
import { MemberForm } from "./components/CreateForm"

export default async function CreateMember() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen max-h-screen overflow-hidden">
      <Sidebar />
      <div className="bg-[#F6F6F9] flex flex-col flex-1 h-screen max-h-screen overflow-scroll">
        <header className="flex flex-col gap-[17px] bg-white p-6 md:py-[30px] md:px-[38px]">
          <div className="flex justify-between">
            <span className="text-base md:text-[33px] font-bold text-black">
              Add member
            </span>
          </div>
        </header>
        <div className="overflow-x-scroll h-full relative flex-1 md:flex-none">
          <div className="bg-white m-0 md:mx-auto md:my-[46px] rounded-[10px] p-6 md:pt-[58px] md:pb-[40px] md:px-[70px] max-w-[716px] w-full">
            <MemberForm />
          </div>
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
