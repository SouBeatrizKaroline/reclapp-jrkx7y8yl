import { Leaf } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-10 px-4 text-center text-xs text-muted-foreground space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Leaf className="w-4 h-4 text-emerald-600" />
        <span className="font-bold text-sm text-foreground">ReClapp: Gamificação Sustentável</span>
      </div>
      <p className="max-w-md mx-auto">
        Transformando reciclagem e educação ambiental em uma experiência divertida, social e
        recompensadora.
      </p>
      <div className="flex justify-center gap-6 font-medium">
        <a href="#" className="hover:text-emerald-600 transition-colors">
          Sobre
        </a>
        <a href="#" className="hover:text-emerald-600 transition-colors">
          Termos
        </a>
        <a href="#" className="hover:text-emerald-600 transition-colors">
          Privacidade
        </a>
        <a href="#" className="hover:text-emerald-600 transition-colors">
          Contato
        </a>
      </div>
      <p>© {new Date().getFullYear()} ReClapp. Todos os direitos reservados.</p>
    </footer>
  )
}
