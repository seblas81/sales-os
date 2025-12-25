import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner" // Para las notificaciones
import AuthProvider from "@/components/layout/AuthProvider" // Lo creamos abajo

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SalesOS",
  description: "Sistema de Gestión Comercial",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
} 
