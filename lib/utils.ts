import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// 1. Función para combinar clases (Shadcn)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 2. Función para dinero (Pipeline)
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// 3. Función para fechas (Pipeline)
export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
