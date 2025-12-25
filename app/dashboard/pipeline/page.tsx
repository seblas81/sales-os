import PipelineTable from "@/components/PipelineTable" // Asegúrate de haber creado este componente en el paso 2
import DealForm from "@/components/forms/DealForm"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { prisma } from "@/lib/prisma"

export default async function PipelinePage() {
  // Fetch de datos real (Server Side)
  const deals = await prisma.deal.findMany({
    orderBy: { updatedAt: 'desc' }
  })

  // Convertimos los Decimal de prisma a number para el componente visual si es necesario
  const formattedDeals = deals.map(d => ({
    ...d,
    amount: Number(d.amount),
    nextActionDate: d.nextActionDate?.toISOString().split('T')[0] || ''
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pipeline Comercial</h1>
            <p className="text-slate-500">Gestión de oportunidades activas.</p>
        </div>
        
        {/* Modal para Crear Negocio */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-slate-900 text-white">Nueva Oportunidad</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle>Crear Oportunidad</DialogTitle>
            </DialogHeader>
            <DealForm />
          </DialogContent>
        </Dialog>
      </div>

      <PipelineTable deals={formattedDeals} />
    </div>
  )
}
