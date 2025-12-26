'use server'

import { revalidatePath } from "next/cache"

export async function logActivity(formData: FormData) {
  // Obtenemos los datos del formulario
  const rawData = formData.get('data')
  
  if (!rawData) {
    return { success: false, error: "No data received" }
  }

  // Aquí imprimimos en la consola del servidor para verificar que llega
  console.log("Datos recibidos en el servidor:", rawData)

  // TODO: Aquí conectaremos la base de datos real más adelante.
  // Por ahora simulamos una espera y devolvemos éxito.
  await new Promise(resolve => setTimeout(resolve, 500))

  revalidatePath('/dashboard')
  return { success: true }
}
