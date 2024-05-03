"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="md:flex-1 order-3 md:order-2">
      <ul className="flex flex-col gap-[21px]">
        <li>
          <Link href="/team-members" className={cn("group relative w-fit flex items-center gap-[10px] text-[13px] font-bold text-white duration-300 hover:text-secondary after:content-['>'] after:opacity-0 after:absolute after:-right-[25px] after:top-1/2 after:-translate-y-1/2 hover:after:opacity-100", {
            "text-secondary after:content-['>'] after:absolute after:-right-[25px] after:top-1/2 after:-translate-y-1/2 after:opacity-100": pathname === "/team-members",
          })}>
            <div
              className={
                cn("rounded-full h-[15px] w-[15px] bg-white duration-300 group-hover:bg-secondary", {
                  "bg-secondary": pathname === "/team-members",
                })
              }
            ></div>
            Team members
          </Link>
        </li>
      </ul>
    </nav>
  )
}
