 
'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner" // Librería de notificaciones minimalista
import { logWeeklyActivity } from "@/app/actions" // Server Action (ver abajo)

// Esquema de validación (Best Practice)
const activitySchema = z.object({
  weekStartDate: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
    message: "Fecha requerida",
  }),
  newConversations: z.coerce.number().min(0, "No puede ser negativo"),
  followUps: z.coerce.number().min(0),
  demosProposed: z.coerce.number().min(0),
  demosHeld: z.coerce.number().min(0),
  quotesSent: z.coerce.number().min(0),
  observations: z.string().optional(),
})

export default function ActivityLogForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      newConversations: 0,
      followUps: 0,
      demosProposed: 0,
      demosHeld: 0,
      quotesSent: 0
    }
  })

  async function onSubmit(data: z.infer<typeof activitySchema>) {
    try {
      // Llamada al Server Action
      await logWeeklyActivity(data)
      toast.success("Actividad registrada correctamente")
      reset() // Limpia el form tras éxito
    } catch (error) {
      toast.error("Error al guardar actividad")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg bg-white p-8 rounded-xl shadow-sm border border-slate-100">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">Registro Semanal</h3>
        <p className="text-sm text-slate-500">Ingresa tus métricas de la semana actual.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weekStartDate">Semana del</Label>
          <Input type="date" {...register("weekStartDate")} className="w-full" />
          {errors.weekStartDate && <p className="text-xs text-red-500">{errors.weekStartDate.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Conversaciones Nuevas</Label>
            <Input type="number" {...register("newConversations")} />
          </div>
          <div className="space-y-2">
            <Label>Seguimientos</Label>
            <Input type="number" {...register("followUps")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Demos Propuestas</Label>
            <Input type="number" {...register("demosProposed")} />
          </div>
          <div className="space-y-2">
            <Label>Demos Realizadas</Label>
            <Input type="number" {...register("demosHeld")} />
          </div>
        </div>
        
        <div className="space-y-2">
            <Label>Cotizaciones Enviadas</Label>
            <Input type="number" {...register("quotesSent")} className="w-1/2" />
        </div>

        <div className="space-y-2">
          <Label>Observaciones / Bloqueos</Label>
          <Textarea 
            {...register("observations")} 
            placeholder="¿Hubo algún impedimento esta semana?"
            className="resize-none h-24"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Registrar Actividad"}
      </Button>
    </form>
  )
}
