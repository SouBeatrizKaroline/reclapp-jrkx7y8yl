import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { confirmPasswordReset } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await confirmPasswordReset(token, password)
    setLoading(false)
    if (error) toast.error('Token inválido ou expirado.')
    else {
      toast.success('Senha redefinida com sucesso!')
      navigate('/login')
    }
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-6">
      <h1 className="text-2xl font-extrabold text-center">Nova Senha</h1>
      <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 space-y-4 shadow-sm">
        <Input
          type="password"
          placeholder="Digite a nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white font-bold text-xs"
        >
          {loading ? 'Salvando...' : 'Redefinir Senha'}
        </Button>
      </form>
    </div>
  )
}
