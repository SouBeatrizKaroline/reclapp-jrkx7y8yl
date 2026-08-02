import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground space-y-4 p-4 text-center">
      <h1 className="text-6xl font-extrabold text-emerald-600">404</h1>
      <p className="text-xl font-bold">Página Não Encontrada</p>
      <p className="text-xs text-muted-foreground max-w-sm">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700"
      >
        Voltar para o Início
      </Link>
    </div>
  )
}
