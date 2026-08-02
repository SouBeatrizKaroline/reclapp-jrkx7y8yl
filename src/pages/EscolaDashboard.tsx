import { School } from 'lucide-react'

export default function EscolaDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-extrabold flex items-center gap-2">
        <School className="w-6 h-6 text-emerald-600" />
        Painel de Educação Ambiental Escolar
      </h1>
      <p className="text-xs text-muted-foreground">Gincanas e desafios entre turmas da escola.</p>
    </div>
  )
}
