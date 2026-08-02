import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Leaf } from 'lucide-react'
import { toast } from 'sonner'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 8) {
      toast.error('A senha deve ter pelo menos 8 caracteres.')
      return
    }
    setLoading(true)
    const { error } = await signUp(email, password, name)
    setLoading(false)
    if (error) {
      toast.error('Erro ao criar conta. E-mail já em uso?')
    } else {
      toast.success('Conta criada com sucesso! Redirecionando...')
      navigate('/onboarding')
    }
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
          <Leaf className="w-6 h-6 fill-white" />
        </div>
        <h1 className="text-2xl font-extrabold">Criar Conta no ReClapp</h1>
        <p className="text-xs text-muted-foreground">
          Junte-se a milhares de pessoas transformando o planeta
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-muted-foreground">Nome Completo</label>
          <Input
            placeholder="Maria Silva"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-muted-foreground">E-mail</label>
          <Input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-muted-foreground">
            Senha (mín. 8 caracteres)
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10"
        >
          {loading ? 'Criando Conta...' : 'Cadastrar e Começar'}
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        Já possui uma conta?{' '}
        <Link to="/login" className="text-emerald-600 font-bold hover:underline">
          Faça login
        </Link>
      </p>
    </div>
  )
}
