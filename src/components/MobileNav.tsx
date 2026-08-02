import { NavLink } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Home, MapPin, Camera, Trophy, User as UserIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) return null

  const links = [
    { to: '/feed', label: 'Feed', icon: Home },
    { to: '/mapa', label: 'Mapa', icon: MapPin },
    { to: '/scanner', label: 'Scanner', icon: Camera },
    { to: '/desafios', label: 'Desafios', icon: Trophy },
    { to: `/perfil/${user.id}`, label: 'Perfil', icon: UserIcon },
  ]

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t px-2 py-1.5 flex justify-around items-center shadow-lg">
      {links.map((link) => {
        const Icon = link.icon
        return (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-semibold transition-all',
                isActive ? 'text-emerald-600 font-bold scale-105' : 'text-muted-foreground',
              )
            }
          >
            <Icon className="w-5 h-5" />
            <span>{link.label}</span>
          </NavLink>
        )
      })}
    </div>
  )
}
