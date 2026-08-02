import { useEffect, useState } from 'react'
import { getMaterials } from '@/services/materials'
import { Material } from '@/types'
import { MaterialCard } from '@/components/MaterialCard'
import { BookOpen } from 'lucide-react'

export default function Biblioteca() {
  const [materials, setMaterials] = useState<Material[]>([])

  useEffect(() => {
    getMaterials()
      .then(setMaterials)
      .catch(() => {})
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          Guia de Materiais e Reciclagem
        </h1>
        <p className="text-xs text-muted-foreground">
          Aprenda a descartar e reaproveitar cada tipo de resíduo do dia a dia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {materials.map((m) => (
          <MaterialCard key={m.id} material={m} />
        ))}
      </div>
    </div>
  )
}
