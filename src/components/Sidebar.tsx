import { NavLink } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import {
  Home,
  Trophy,
  MapPin,
  BookOpen,
  Hammer,
  BarChart2,
  Camera,
  Shield,
  Building2,
  School,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) return null

  const links = [
    { to: '/feed', label: 'Feed Social', icon: Home },
    { to: '/desafios', label: 'Desafios', icon: Trophy },
    { to: '/mapa', label: 'Mapa Ecopontos', icon: MapPin },
    { to: '/scanner', label: 'Scanner AI', icon: Camera },
    { to: '/biblioteca', label: 'Biblioteca', icon: BookOpen },
    { to: '/diy', label: 'DIY Reutilização', icon: Hammer },
    { to: '/ranking', label: 'Ranking Global', icon: BarChart2 },
  ]

  return (
    <aside className="hidden lg:flex flex-col w-60 border-r bg-card min-h-[calc(100vh-4rem)] p-4 space-y-6 shrink-0">
      {user && (
        <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow">
              {user.name?.substring(0, 2).toUpperCase() || 'RC'}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-sm text-foreground truncate">{user.name}</h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                {user.city || 'Guardião ReClapp'}
              </p>
            </div>
          </div>
        </div>
      )}

      <nav className="space-y-1">
        <p className="px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
          Navegação
        </p>
        {links.map((link) => {
          const Icon = link.icon
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all',
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )
              }
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {user?.role && user.role !== 'user' && (
        <div className="pt-4 border-t space-y-1">
          <p className="px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            Gestão Especial
          </p>
          {user.role === 'municipio_admin' && (
            <NavLink
              to="/municipio/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50"
            >
              <Shield className="w-4 h-4" /> <span>Painel Município</span>
            </NavLink>
          )}
          {user.role === 'empresa_admin' && (
            <NavLink
              to="/empresa/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-amber-600 hover:bg-amber-50"
            >
              <Building2 className="w-4 h-4" /> <span>Painel Empresa</span>
            </NavLink>
          )}
          {user.role === 'escola_admin' && (
            <NavLink
              to="/escola/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50"
            >
              <School className="w-4 h-4" /> <span>Painel Escola</span>
            </NavLink>
          )}
        </div>
      )}
    </aside>
  )
}
