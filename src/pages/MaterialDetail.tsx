import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMaterialByCategory } from '@/services/materials'
import { Material } from '@/types'
import { ArrowLeft, Recycle, Lightbulb, ShieldCheck } from 'lucide-react'

export default function MaterialDetail() {
  const { material } = useParams()
  const [data, setData] = useState<Material | null>(null)

  useEffect(() => {
    if (material) {
      getMaterialByCategory(material)
        .then(setData)
        .catch(() => {})
    }
  }, [material])

  if (!data)
    return (
      <p className="text-center py-8 text-xs text-muted-foreground">Carregando informações...</p>
    )

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        to="/biblioteca"
        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar para Biblioteca
      </Link>

      <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b pb-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-3xl flex items-center justify-center">
            {data.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="text-xs text-muted-foreground capitalize">Categoria: {data.category}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-bold text-sm flex items-center gap-2 text-emerald-700">
              <Recycle className="w-4 h-4" /> Como Reciclar
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed bg-muted/40 p-3 rounded-xl border">
              {data.how_to_recycle}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm flex items-center gap-2 text-amber-600">
              <Lightbulb className="w-4 h-4" /> Ideias de Reutilização
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed bg-muted/40 p-3 rounded-xl border">
              {data.how_to_reuse}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm flex items-center gap-2 text-blue-600">
              <ShieldCheck className="w-4 h-4" /> Impacto Ambiental
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed bg-muted/40 p-3 rounded-xl border">
              {data.environmental_impact}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
