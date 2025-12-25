'use client'

import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  const { data: session } = useSession()
  const userInitials = session?.user?.name
    ? session.user.name.split(' ').map(n => n[0]).join('').substring(0, 2)
    : "US"

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Dashboard</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-slate-900">{session?.user?.name || "Usuario"}</p>
          <p className="text-xs text-slate-500">{session?.user?.email}</p>
        </div>
        <Avatar>
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback className="bg-slate-900 text-white">{userInitials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
} 
