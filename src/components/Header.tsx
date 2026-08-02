import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { EcoPointBadge } from '@/components/EcoPointBadge'
import { Leaf, Bell, LogOut, User as UserIcon, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const { user, isAuthenticated, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 fill-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
            ReClapp
          </span>
        </Link>

        {isAuthenticated && user ? (
          <div className="flex items-center gap-3">
            <EcoPointBadge points={user.eco_points || 0} size="md" />

            <Link
              to="/notificacoes"
              className="relative p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full p-0 border-2 border-emerald-500"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        user.avatar
                          ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/users/${user.id}/${user.avatar}`
                          : undefined
                      }
                    />
                    <AvatarFallback className="bg-emerald-100 text-emerald-800 font-bold">
                      {user.name?.substring(0, 2).toUpperCase() || 'RC'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to={`/perfil/${user.id}`}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <UserIcon className="w-4 h-4 text-emerald-600" />
                    <span>Meu Perfil</span>
                  </Link>
                </DropdownMenuItem>
                {user.role === 'municipio_admin' && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/municipio/dashboard"
                      className="flex items-center gap-2 cursor-pointer text-blue-600"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      <span>Painel Município</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-rose-600 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="font-semibold text-xs">
                Entrar
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow-sm"
              >
                Cadastre-se
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
