import { Coins, Sparkles } from 'lucide-react'

interface EcoPointBadgeProps {
  points: number
  size?: 'sm' | 'md' | 'lg'
}

export function EcoPointBadge({ points, size = 'md' }: EcoPointBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base font-bold',
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-yellow-200 dark:from-amber-950 dark:to-yellow-900 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 rounded-full font-semibold shadow-sm transition-all hover:scale-105 ${sizeClasses[size]}`}
    >
      <Coins className="w-4 h-4 text-yellow-600 dark:text-yellow-400 animate-pulse" />
      <span>{points.toLocaleString()} pts</span>
      <Sparkles className="w-3 h-3 text-amber-500" />
    </div>
  )
}
