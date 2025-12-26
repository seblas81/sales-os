'use server'

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma" // Tu cliente instanciado
import { z } from "zod"

// Acción para guardar Actividad Semanal
export async function logWeeklyActivity(data: any) {
  // Aquí validaríamos la sesión del usuario (Auth)
  // const user = await getCurrentUser() 
  
  await prisma.weeklyActivity.create({
    data: {
      userId: "user_id_placeholder", // Esto vendrá de la sesión real
      weekStartDate: new Date(data.weekStartDate),
      newConversations: data.newConversations,
      followUps: data.followUps,
      demosProposed: data.demosProposed,
      demosHeld: data.demosHeld,
      quotesSent: data.quotesSent,
      observations: data.observations,
      // Calculamos cumplimiento aquí o en DB trigger
    }
  })
  
  // Revalidar caché para que el Dashboard se actualice solo
  revalidatePath('/dashboard')
} 
