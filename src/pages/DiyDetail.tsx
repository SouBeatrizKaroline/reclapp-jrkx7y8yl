import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import { DiyTutorial } from '@/types'
import { Clock, Hammer, Heart } from 'lucide-react'

export default function DiyDetail() {
  const { id } = useParams()
  const [diy, setDiy] = useState<DiyTutorial | null>(null)

  useEffect(() => {
    if (id) {
      pb.collection('diy_tutorials')
        .getOne<DiyTutorial>(id, { expand: 'user_id' })
        .then(setDiy)
        .catch(() => {})
    }
  }, [id])

  if (!diy)
    return <p className="text-center py-8 text-xs text-muted-foreground">Carregando projeto...</p>

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
        <h1 className="text-2xl font-bold">{diy.title}</h1>
        <div className="flex items-center gap-4 text-xs text-muted-foreground border-b pb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {diy.time_estimate || '20 min'}
          </span>
          <span className="flex items-center gap-1">
            <Hammer className="w-4 h-4" /> Dificuldade {diy.difficulty || 1}
          </span>
        </div>
        <p className="text-xs text-foreground leading-relaxed whitespace-pre-line">
          {diy.description}
        </p>
      </div>
    </div>
  )
}
