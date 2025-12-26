 
import KPIGrid from "@/components/KPIGrid"
import { prisma } from "@/lib/prisma"
export const dynamic = 'force-dynamic'

// Página Servidor: Fetch de datos directo
export default async function DashboardPage() {
  // Aquí haríamos las consultas reales a Prisma para llenar los KPIs
  // Por ahora pasamos datos mockeados o calculados simples
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Resumen General</h1>
        <p className="text-slate-500">Vista de alto nivel de tus resultados mensuales.</p>
      </div>

      <KPIGrid />
      
      {/* Aquí iría el gráfico cuando lo creemos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 rounded-xl border border-slate-100 bg-white p-6 shadow-sm flex items-center justify-center text-slate-400">
            Gráfico de Ventas (Próximamente)
        </div>
        <div className="h-64 rounded-xl border border-slate-100 bg-white p-6 shadow-sm flex items-center justify-center text-slate-400">
            Gráfico de Actividad (Próximamente)
        </div>
      </div>
    </div>
  )
}
