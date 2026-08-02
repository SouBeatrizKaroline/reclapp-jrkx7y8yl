import { Building2 } from 'lucide-react'

export default function EmpresaDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-extrabold flex items-center gap-2">
        <Building2 className="w-6 h-6 text-amber-500" />
        Painel ESG da Empresa
      </h1>
      <p className="text-xs text-muted-foreground">
        Acompanhamento de metas de sustentabilidade corporativa.
      </p>
    </div>
  )
}
