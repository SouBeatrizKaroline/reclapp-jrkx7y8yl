import { Building2, Users, Recycle, TreePine } from 'lucide-react'

export default function MunicipioDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <Building2 className="w-6 h-6 text-blue-600" />
          Painel do Município
        </h1>
        <p className="text-xs text-muted-foreground">
          Métricas de impacto e taxa de reciclagem da cidade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border rounded-2xl p-5 space-y-2 shadow-sm">
          <p className="text-xs text-muted-foreground font-bold">Cidadãos Ativos</p>
          <p className="text-2xl font-extrabold text-blue-600">12.480</p>
        </div>
        <div className="bg-card border rounded-2xl p-5 space-y-2 shadow-sm">
          <p className="text-xs text-muted-foreground font-bold">Resíduos Coletados</p>
          <p className="text-2xl font-extrabold text-emerald-600">48.5 Toneladas</p>
        </div>
        <div className="bg-card border rounded-2xl p-5 space-y-2 shadow-sm">
          <p className="text-xs text-muted-foreground font-bold">CO₂ Evitado</p>
          <p className="text-2xl font-extrabold text-teal-600">18.2 Toneladas</p>
        </div>
      </div>
    </div>
  )
}
