 
import { Badge } from "@/components/ui/badge" // Suponiendo Shadcn/UI
import { formatCurrency, formatDate } from "@/lib/utils"

interface Deal {
  id: string
  clientName: string
  stage: 'DISCOVERY' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON'
  amount: number
  probability: number
  nextActionDate: string
}

// Mapeo de colores para estados (UX visual rápida)
const stageColors = {
  DISCOVERY: "bg-blue-100 text-blue-700",
  PROPOSAL: "bg-purple-100 text-purple-700",
  NEGOTIATION: "bg-orange-100 text-orange-700",
  CLOSED_WON: "bg-green-100 text-green-700",
}

export default function PipelineTable({ deals }: { deals: Deal[] }) {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800">Oportunidades Activas</h3>
        <button className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
          + Nueva Oportunidad
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
            <tr>
              <th className="px-6 py-3 font-medium">Cliente</th>
              <th className="px-6 py-3 font-medium">Etapa</th>
              <th className="px-6 py-3 font-medium text-right">Monto</th>
              <th className="px-6 py-3 font-medium text-center">Probabilidad</th>
              <th className="px-6 py-3 font-medium">Próx. Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {deal.clientName}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${stageColors[deal.stage]}`}>
                    {deal.stage}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-mono text-slate-600">
                  {formatCurrency(deal.amount)}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1">
                    <div 
                      className="bg-slate-800 h-1.5 rounded-full" 
                      style={{ width: `${deal.probability}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">{deal.probability}%</span>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {formatDate(deal.nextActionDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
