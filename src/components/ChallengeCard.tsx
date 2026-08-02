import { Trophy, CheckCircle2, ArrowRight } from 'lucide-react'
import { Challenge } from '@/types'
import { EcoPointBadge } from '@/components/EcoPointBadge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface ChallengeCardProps {
  challenge: Challenge
  onParticipate?: (challenge: Challenge) => void
  isCompleted?: boolean
}

export function ChallengeCard({ challenge, onParticipate, isCompleted }: ChallengeCardProps) {
  return (
    <div className="bg-card border rounded-xl p-5 shadow-sm space-y-4 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
            Desafio {challenge.type}
          </span>
          <EcoPointBadge points={challenge.reward_points} size="sm" />
        </div>
        <h3 className="font-bold text-base text-foreground flex items-center gap-2">
          <Trophy className="w-4 h-4 text-emerald-600 shrink-0" />
          {challenge.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
          {challenge.description}
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progresso</span>
            <span className="font-medium text-emerald-600">{isCompleted ? '100%' : '0%'}</span>
          </div>
          <Progress
            value={isCompleted ? 100 : 10}
            className="h-2 bg-emerald-100 dark:bg-emerald-950"
          />
        </div>

        {isCompleted ? (
          <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-xs py-2 bg-emerald-50 dark:bg-emerald-950 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" /> Concluído com Sucesso!
          </div>
        ) : (
          <Button
            onClick={() => onParticipate && onParticipate(challenge)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold h-9 gap-1.5"
          >
            <span>Cumprir Desafio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  )
}
