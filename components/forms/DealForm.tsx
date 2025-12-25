 
'use client'
// Imports similares al anterior...

const dealSchema = z.object({
  clientName: z.string().min(2, "Nombre de cliente requerido"),
  stage: z.enum(["DISCOVERY", "PROPOSAL", "NEGOTIATION", "CLOSED_WON"]),
  amount: z.coerce.number().positive("El monto debe ser positivo"),
  probability: z.coerce.number().min(0).max(100),
  nextAction: z.string().min(3, "Define una próxima acción clara"),
  nextActionDate: z.string()
})

export default function DealForm({ onSuccess }: { onSuccess?: () => void }) {
  const { register, handleSubmit, watch, setValue } = useForm({
    resolver: zodResolver(dealSchema),
    defaultValues: { probability: 10, stage: "DISCOVERY" }
  })

  // Automatización UX: Cambiar probabilidad según la etapa seleccionada
  const selectedStage = watch("stage")
  // Efecto simple para sugerir probabilidad (lógica de negocio implícita)
  // React useEffect iría aquí para actualizar setValue('probability') si cambia el stage

  return (
    <form className="space-y-5">
      <div className="space-y-2">
        <Label>Cliente / Empresa</Label>
        <Input {...register("clientName")} placeholder="Ej: Tech Solutions Inc." />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Etapa</Label>
          <select 
            {...register("stage")} 
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-slate-950"
          >
            <option value="DISCOVERY">Descubrimiento</option>
            <option value="PROPOSAL">Propuesta</option>
            <option value="NEGOTIATION">Negociación</option>
            <option value="CLOSED_WON">Cerrado Ganado</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Monto (USD)</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-500">$</span>
            <Input type="number" {...register("amount")} className="pl-7" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
            <Label>Probabilidad de Cierre</Label>
            <span className="text-xs text-slate-500">{watch("probability")}%</span>
        </div>
        <input 
          type="range" 
          {...register("probability")} 
          className="w-full accent-slate-900 cursor-pointer" 
          min="0" max="100" step="5"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label>Próxima Acción</Label>
            <Input {...register("nextAction")} placeholder="Ej: Enviar contrato" />
        </div>
        <div className="space-y-2">
            <Label>Fecha Límite</Label>
            <Input type="date" {...register("nextActionDate")} />
        </div>
      </div>

      <Button className="w-full bg-slate-900 text-white">Crear Oportunidad</Button>
    </form>
  )
}
