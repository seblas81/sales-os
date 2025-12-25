 
'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BarChart3, ListTodo, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils" // Utilidad estándar de Shadcn para clases

const menuItems = [
  { icon: LayoutDashboard, label: "Tablero Principal", href: "/dashboard" },
  { icon: BarChart3, label: "Pipeline", href: "/dashboard/pipeline" },
  { icon: ListTodo, label: "Registro Actividad", href: "/dashboard/actividad" },
  { icon: Settings, label: "Configuración", href: "/dashboard/settings" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col justify-between px-4 py-6">
      <div>
        {/* Logo Minimalista */}
        <div className="mb-10 flex items-center gap-2 px-2">
          <div className="h-6 w-6 rounded-md bg-slate-900" />
          <span className="text-lg font-bold tracking-tight text-slate-900">
            SalesOS
          </span>
        </div>

        {/* Navegación */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-slate-100 text-slate-900" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer del Sidebar */}
      <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:text-red-500 transition-colors">
        <LogOut size={18} />
        Cerrar Sesión
      </button>
    </div>
  )
}
