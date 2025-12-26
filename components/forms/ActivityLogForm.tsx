"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import { logActivity } from "@/app/actions"
import { toast } from "sonner"

// Esquema de validación (Solo lo que el usuario escribe)
const formSchema = z.object({
  newConversations: z.coerce.number().min(0),
  followUps: z.coerce.number().min(0),
  demosProposed: z.coerce.number().min(0),
  demosHeld: z.coerce.number().min(0),
  quotesSent: z.coerce.number().min(0),
  observations: z.string().optional(),
})

export default function ActivityLogForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newConversations: 0,
      followUps: 0,
      demosProposed: 0,
      demosHeld: 0,
      quotesSent: 0,
      observations: "",
    },
  })

  // Aquí arreglamos el tipo: onSubmit recibe SOLO lo que hay en el formulario
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Creamos el objeto final agregando la fecha aquí manualmente
      const formData = new FormData()
      formData.append("type", "weekly_metric")
      formData.append("data", JSON.stringify({
        ...values,
        weekStartDate: new Date().toISOString() // Agregamos la fecha faltante
      }))

      await logActivity(formData)
      
      toast.success("Actividad registrada correctamente")
      form.reset()
    } catch (error) {
      toast.error("Error al registrar actividad")
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg bg-white p-8 rounded-xl shadow-sm border border-slate-100">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">Registro Semanal</h3>
          <p className="text-sm text-slate-500">Ingresa tus métricas de la semana actual.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="newConversations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nuevas Conversaciones</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="followUps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seguimientos</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="demosProposed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demos Propuestas</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="demosHeld"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demos Realizadas</FormLabel>
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
          name="quotesSent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cotizaciones Enviadas</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Registrar Actividad</Button>
      </form>
    </Form>
  )
}
