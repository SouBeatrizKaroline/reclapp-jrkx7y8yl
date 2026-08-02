import { Link } from 'react-router-dom'
import { DiyTutorial } from '@/types'
import { Clock, Hammer, Heart } from 'lucide-react'

interface DiyCardProps {
  diy: DiyTutorial
}

export function DiyCard({ diy }: DiyCardProps) {
  const authorName = diy.expand?.user_id?.name || 'Mestre ReClapp'

  return (
    <Link
      to={`/diy/${diy.id}`}
      className="bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between group"
    >
      <div>
        <div className="h-40 bg-emerald-100 dark:bg-emerald-950 relative overflow-hidden flex items-center justify-center text-4xl">
          {diy.cover_image ? (
            <img
              src={`${import.meta.env.VITE_POCKETBASE_URL}/api/files/diy_tutorials/${diy.id}/${diy.cover_image}`}
              alt={diy.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span>🎨</span>
          )}
          <span className="absolute top-2 right-2 bg-background/90 backdrop-blur text-xs font-semibold px-2.5 py-1 rounded-full capitalize border">
            {diy.category}
          </span>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {diy.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {diy.description}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0 border-t flex items-center justify-between text-xs text-muted-foreground mt-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {diy.time_estimate || '20 min'}
          </span>
          <span className="flex items-center gap-1">
            <Hammer className="w-3.5 h-3.5" /> Nível {diy.difficulty || 1}
          </span>
        </div>
        <span className="flex items-center gap-1 font-semibold text-rose-500">
          <Heart className="w-3.5 h-3.5 fill-rose-500" /> {diy.likes_count || 0}
        </span>
      </div>
    </Link>
  )
}
