import { Link } from 'react-router-dom'
import { Material } from '@/types'
import { ChevronRight } from 'lucide-react'

interface MaterialCardProps {
  material: Material
}

export function MaterialCard({ material }: MaterialCardProps) {
  return (
    <Link
      to={`/biblioteca/${material.category}`}
      className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex items-center justify-between group"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-2xl border border-emerald-200 dark:border-emerald-800">
          {material.icon}
        </div>
        <div>
          <h4 className="font-bold text-sm text-foreground group-hover:text-emerald-600 transition-colors">
            {material.name}
          </h4>
          <p className="text-xs text-muted-foreground capitalize">Categoria: {material.category}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
    </Link>
  )
}
