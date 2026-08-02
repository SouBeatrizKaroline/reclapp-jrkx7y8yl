import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      return
    }
    pb.collection('users')
      .confirmVerification(token)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
  }, [token])

  return (
    <div className="max-w-md mx-auto py-16 px-4 text-center space-y-6">
      {status === 'loading' && <p>Verificando seu e-mail...</p>}
      {status === 'success' && (
        <div className="space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
          <h1 className="text-2xl font-bold">E-mail verificado!</h1>
          <Link to="/feed" className="text-emerald-600 font-bold underline">
            Ir para o Feed
          </Link>
        </div>
      )}
      {status === 'error' && (
        <div className="space-y-4">
          <XCircle className="w-16 h-16 text-rose-500 mx-auto" />
          <h1 className="text-2xl font-bold">Link de verificação inválido</h1>
          <Link to="/" className="text-emerald-600 font-bold underline">
            Voltar para o Início
          </Link>
        </div>
      )}
    </div>
  )
}
