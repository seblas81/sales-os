'use server'

import { revalidatePath } from "next/cache"

// Acción para registrar actividad semanal
export async function logActivity(formData: FormData) {
  const rawData = formData.get('data')
  if (!rawData) return { success: false }
  
  console.log("Actividad recibida:", rawData)
  await new Promise(resolve => setTimeout(resolve, 500))
  
  revalidatePath('/dashboard')
  return { success: true }
}

// Acción para crear un nuevo Deal (La que faltaba)
export async function createDeal(formData: FormData) {
  const rawData = formData.get('data')
  if (!rawData) return { success: false }

  console.log("Deal recibido:", rawData)
  await new Promise(resolve => setTimeout(resolve, 500))

  revalidatePath('/dashboard/pipeline')
  return { success: true }
}
