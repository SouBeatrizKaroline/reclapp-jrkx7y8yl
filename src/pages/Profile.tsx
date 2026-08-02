import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import { User } from '@/types'
import { EcoPointBadge } from '@/components/EcoPointBadge'
import { LevelBadge } from '@/components/LevelBadge'
import { Trophy, Award, Calendar, MapPin } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Profile() {
  const { id } = useParams()
  const [profileUser, setProfileUser] = useState<User | null>(null)

  useEffect(() => {
    if (id) {
      pb.collection('users')
        .getOne<User>(id)
        .then(setProfileUser)
        .catch(() => {})
    }
  }, [id])

  if (!profileUser)
    return <p className="text-center py-8 text-xs text-muted-foreground">Carregando perfil...</p>

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
        <div className="h-32 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />
        <div className="p-6 pt-0 relative space-y-4">
          <div className="flex justify-between items-end -mt-12">
            <Avatar className="w-24 h-24 border-4 border-background shadow-md">
              <AvatarImage
                src={
                  profileUser.avatar
                    ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/users/${profileUser.id}/${profileUser.avatar}`
                    : undefined
                }
              />
              <AvatarFallback className="bg-emerald-100 text-emerald-800 text-2xl font-bold">
                {profileUser.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <EcoPointBadge points={profileUser.eco_points || 0} size="lg" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold">{profileUser.name}</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{profileUser.city || 'São Paulo'}, Brasil</span>
            </p>
          </div>

          <p className="text-xs text-foreground">
            {profileUser.bio || 'Guardião apaixonado pelo meio ambiente.'}
          </p>

          <LevelBadge level={profileUser.level || 1} streak={profileUser.streak_days || 1} />

          <div className="grid grid-cols-3 gap-3 pt-3 border-t text-center">
            <div className="bg-muted/40 p-3 rounded-xl">
              <p className="text-xs text-muted-foreground">Nível</p>
              <p className="font-extrabold text-base text-emerald-600">{profileUser.level || 1}</p>
            </div>
            <div className="bg-muted/40 p-3 rounded-xl">
              <p className="text-xs text-muted-foreground">EcoPoints</p>
              <p className="font-extrabold text-base text-amber-500">
                {profileUser.eco_points || 0}
              </p>
            </div>
            <div className="bg-muted/40 p-3 rounded-xl">
              <p className="text-xs text-muted-foreground">Ofensiva</p>
              <p className="font-extrabold text-base text-orange-500">
                {profileUser.streak_days || 1}d
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
