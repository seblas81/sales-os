import { ArrowUpRight, ArrowDownRight, DollarSign, Activity } from "lucide-react"

// Componente reutilizable para mantener consistencia
const KPICard = ({ title, value, subtext, trend }: any) => (
  <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
      </div>
      <div className={`p-2 rounded-lg ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}>
        {trend === 'up' ? <ArrowUpRight size={20} /> : <Activity size={20} />}
      </div>
    </div>
    {subtext && <p className="text-xs text-slate-400 mt-4">{subtext}</p>}
  </div>
)

export default function KPIGrid() {
  // Estos datos vendrían de la DB calculados desde "Resultados Mensuales"
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <KPICard 
        title="Ventas Mes (USD)" 
        value="$12,450" 
        subtext="Objetivo: $15,000 (83%)" 
        trend="up" 
      />
      <KPICard 
        title="Comisiones Estimadas" 
        value="$1,245" 
        subtext="Incluye bonus de proactividad" 
        trend="up" 
      />
      <KPICard 
        title="Oportunidades Activas" 
        value="8" 
        subtext="Pipeline saludable" 
        trend="neutral" 
      />
      <KPICard 
        title="Tasa de Conversión" 
        value="22%" 
        subtext="+2% vs mes anterior" 
        trend="up" 
      />
    </div>
  )
} 
