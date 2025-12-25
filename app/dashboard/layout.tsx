 
import Sidebar from "@/components/layout/Sidebar"
import Header from "@/components/layout/Header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Barra Lateral de Navegación */}
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white md:flex">
        <Sidebar />
      </aside>

      {/* Área Principal */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        
        {/* Contenido Scrollable */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
