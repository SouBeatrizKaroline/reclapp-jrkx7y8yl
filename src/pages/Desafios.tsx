import { useEffect, useState } from 'react'
import { getChallenges, completeChallenge } from '@/services/challenges'
import { Challenge } from '@/types'
import { useAuth } from '@/hooks/use-auth'
import { ChallengeCard } from '@/components/ChallengeCard'
import { Trophy, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

export default function Desafios() {
  const { user } = useAuth()
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [filter, setCategoryFilter] = useState('todos')

  useEffect(() => {
    getChallenges()
      .then(setChallenges)
      .catch(() => {})
  }, [])

  const handleParticipate = async (challenge: Challenge) => {
    if (!user) {
      toast.error('Faça login para cumprir desafios!')
      return
    }
    await completeChallenge(user.id, challenge.id, challenge.reward_points)
    toast.success(`Desafio "${challenge.title}" concluído! +${challenge.reward_points} EcoPoints!`)
    getChallenges().then(setChallenges)
  }

  const filtered = filter === 'todos' ? challenges : challenges.filter((c) => c.type === filter)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            Central de Desafios
          </h1>
          <p className="text-xs text-muted-foreground">
            Cumpra missões diárias e ajude o meio ambiente.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {['todos', 'diario', 'semanal', 'mensal'].map((t) => (
            <button
              key={t}
              onClick={() => setCategoryFilter(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${filter === t ? 'bg-emerald-600 text-white shadow-sm' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((ch) => (
          <ChallengeCard key={ch.id} challenge={ch} onParticipate={handleParticipate} />
        ))}
      </div>
    </div>
  )
}
