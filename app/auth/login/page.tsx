 
'use client'

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Login con credenciales
    await signIn("credentials", { email, password, callbackUrl: "/dashboard" })
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg border border-slate-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">SalesOS</h2>
          <p className="mt-2 text-sm text-slate-600">Inicia sesión para gestionar tu pipeline</p>
        </div>

        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full py-6 flex gap-2 justify-center items-center"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            {/* Icono Google SVG simple */}
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M12.0003 20.45c-4.6667 0-8.45-3.7833-8.45-8.45 0-4.6667 3.7833-8.45 8.45-8.45 2.1583 0 4.225.825 5.825 2.325l-2.4583 2.4583c-.8083-.775-1.9917-1.35-3.3667-1.35-2.8417 0-5.15 2.3083-5.15 5.15s2.3083 5.15 5.15 5.15c2.6 0 4.4917-1.4667 4.9083-3.95h-4.9083v-3.0333h8.3333c.0917.525.1417 1.0667.1417 1.6333 0 4.9167-3.2917 8.5167-8.475 8.5167z" fill="currentColor" /></svg>
            Entrar con Google Workspace
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500">O con email</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              type="email" 
              placeholder="correo@empresa.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800">
              Ingresar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
