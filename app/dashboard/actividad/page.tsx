import ActivityLogForm from "@/components/forms/ActivityLogForm"

export default function ActividadPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Registro de Actividad</h1>
        <p className="text-slate-500">Completa tus métricas semanales cada viernes.</p>
      </div>
      
      <div className="flex justify-center md:justify-start">
        <ActivityLogForm />
      </div>
    </div>
  )
} 
