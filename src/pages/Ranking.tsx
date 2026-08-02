import { useEffect, useState } from 'react'
import { getRanking } from '@/services/dashboards'
import { BarChart2, Medal, Crown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { EcoPointBadge } from '@/components/EcoPointBadge'

export default function Ranking() {
  const [rankUsers, setRankUsers] = useState<any[]>([])

  useEffect(() => {
    getRanking()
      .then(setRankUsers)
      .catch(() => {})
  }, [])

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-emerald-600" />
          Ranking de Guardiões
        </h1>
        <p className="text-xs text-muted-foreground">
          Os usuários mais engajados na reciclagem comunitária.
        </p>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm divide-y">
        {rankUsers.map((u, index) => (
          <div
            key={u.id}
            className={`p-4 flex items-center justify-between ${index === 0 ? 'bg-amber-50/50 dark:bg-amber-950/20' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 text-center font-extrabold text-sm text-muted-foreground">
                {index === 0 ? <Crown className="w-5 h-5 text-amber-500 mx-auto" /> : index + 1}
              </span>
              <Avatar className="w-10 h-10 border">
                <AvatarImage
                  src={
                    u.avatar
                      ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/users/${u.id}/${u.avatar}`
                      : undefined
                  }
                />
                <AvatarFallback className="bg-emerald-100 text-emerald-800 font-bold">
                  {u.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-bold text-sm">{u.name}</h4>
                <p className="text-xs text-muted-foreground">{u.city || 'São Paulo'}</p>
              </div>
            </div>
            <EcoPointBadge points={u.eco_points || 0} size="sm" />
          </div>
        ))}
      </div>
    </div>
  )
}
