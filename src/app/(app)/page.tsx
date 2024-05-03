import { Sidebar } from "@/components/sidebar"

export default function Home() {
  return (
    <main className="flex min-h-screen max-h-screen">
      <Sidebar />
      <div className="bg-[#F6F6F9] flex flex-col flex-1 h-screen"></div>
    </main>
  )
}
