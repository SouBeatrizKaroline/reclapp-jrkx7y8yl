import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { requestPasswordReset } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await requestPasswordReset(email)
    setLoading(false)
    if (error) toast.error('Erro ao enviar solicitação.')
    else toast.success('E-mail de recuperação enviado com sucesso!')
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-6">
      <h1 className="text-2xl font-extrabold text-center">Recuperar Senha</h1>
      <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 space-y-4 shadow-sm">
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white font-bold text-xs"
        >
          {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
        </Button>
      </form>
    </div>
  )
}
