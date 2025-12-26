"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod" // <--- ESTO ES LO QUE FALTABA
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createDeal } from "@/app/actions" // Esto lo crearemos en el paso 2
import { toast } from "sonner"

const dealSchema = z.object({
  clientName: z.string().min(2, "Nombre de cliente requerido"),
  stage: z.enum(["DISCOVERY", "PROPOSAL", "NEGOTIATION", "CLOSED_WON", "CLOSED_LOST"]),
  amount: z.coerce.number().positive("El monto debe ser positivo"),
  probability: z.coerce.number().min(0).max(100),
})

export default function DealForm() {
  const form = useForm<z.infer<typeof dealSchema>>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      clientName: "",
      stage: "DISCOVERY",
      amount: 0,
      probability: 50,
    },
  })

  async function onSubmit(values: z.infer<typeof dealSchema>) {
    try {
      const formData = new FormData()
      // Convertimos los datos a un objeto simple para enviarlos
      formData.append("data", JSON.stringify(values))
      
      await createDeal(formData)
      
      toast.success("Oportunidad creada")
      form.reset()
    } catch (error) {
      toast.error("Error al crear oportunidad")
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <FormControl>
                <Input placeholder="Empresa Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto (USD)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="probability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Probabilidad (%)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Etapa</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona etapa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="DISCOVERY">Descubrimiento</SelectItem>
                  <SelectItem value="PROPOSAL">Propuesta</SelectItem>
                  <SelectItem value="NEGOTIATION">Negociación</SelectItem>
                  <SelectItem value="CLOSED_WON">Ganada</SelectItem>
                  <SelectItem value="CLOSED_LOST">Perdida</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Guardar Deal</Button>
      </form>
    </Form>
  )
}
