import { Shield, Flame } from 'lucide-react'

interface LevelBadgeProps {
  level: number
  streak?: number
}

export function LevelBadge({ level, streak }: LevelBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-bold border border-emerald-300 dark:border-emerald-700">
        <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>Nível {level}</span>
      </div>
      {typeof streak === 'number' && streak > 0 && (
        <div className="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 px-2.5 py-0.5 rounded-full text-xs font-bold border border-orange-300 dark:border-orange-800">
          <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-bounce" />
          <span>{streak}d</span>
        </div>
      )}
    </div>
  )
}
