import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Leaf,
  Trophy,
  MapPin,
  Camera,
  BookOpen,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sendContactMessage } from '@/services/dashboards'
import { toast } from 'sonner'

export default function Index() {
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMsg, setContactMsg] = useState('')
  const [loadingMsg, setLoadingMsg] = useState(false)

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactName || !contactEmail || !contactMsg) return
    setLoadingMsg(true)
    try {
      await sendContactMessage(contactName, contactEmail, contactMsg)
      toast.success('Mensagem enviada com sucesso! Entraremos em contato.')
      setContactName('')
      setContactEmail('')
      setContactMsg('')
    } catch (e) {
      toast.error('Erro ao enviar mensagem.')
    }
    setLoadingMsg(false)
  }

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 p-8 md:p-14 text-white overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Plataforma Global de Sustentabilidade</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Transforme reciclagem em diversão e recompensas!
          </h1>
          <p className="text-emerald-100 text-sm md:text-base leading-relaxed">
            Acumule EcoPoints, cumpra desafios comunitários, encontre ecopontos na sua cidade e
            aprenda a reaproveitar resíduos com o ReClapp.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-extrabold shadow-md gap-2"
              >
                <span>Começar Agora Gratuitamente</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/feed">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/40 font-semibold"
              >
                Ver Feed da Comunidade
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="space-y-8 text-center max-w-4xl mx-auto">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">Como o ReClapp Funciona?</h2>
          <p className="text-sm text-muted-foreground">
            Sua jornada para um estilo de vida mais sustentável em 4 passos simples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
          <div className="bg-card border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="font-bold text-sm">Escaneie Resíduos</h3>
            <p className="text-xs text-muted-foreground">
              Use a câmera inteligente para identificar plástico, vidro, papel e eletrônicos.
            </p>
          </div>
          <div className="bg-card border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="font-bold text-sm">Descarte Correto</h3>
            <p className="text-xs text-muted-foreground">
              Encontre o ecoponto mais próximo no mapa interativo.
            </p>
          </div>
          <div className="bg-card border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="font-bold text-sm">Ganhe EcoPoints</h3>
            <p className="text-xs text-muted-foreground">
              Acumule pontos e desbloqueie conquistas por ações ecológicas.
            </p>
          </div>
          <div className="bg-card border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h3 className="font-bold text-sm">Suba no Ranking</h3>
            <p className="text-xs text-muted-foreground">
              Inspire sua escola, empresa e cidade a baterem metas de sustentabilidade.
            </p>
          </div>
        </div>
      </section>

      {/* Funcionalidades Principais */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-center">Tudo para sua jornada verde</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-3 hover:border-emerald-400 transition-colors">
            <Camera className="w-8 h-8 text-emerald-600" />
            <h3 className="font-bold text-base">Scanner Ecológico com IA</h3>
            <p className="text-xs text-muted-foreground">
              Identificação instantânea de materiais recicláveis e dicas personalizadas de descarte.
            </p>
          </div>
          <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-3 hover:border-emerald-400 transition-colors">
            <MapPin className="w-8 h-8 text-teal-600" />
            <h3 className="font-bold text-base">Mapa de Ecopontos</h3>
            <p className="text-xs text-muted-foreground">
              Localize centros de reciclagem, pontos de entrega voluntária e cooperativas.
            </p>
          </div>
          <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-3 hover:border-emerald-400 transition-colors">
            <Trophy className="w-8 h-8 text-amber-500" />
            <h3 className="font-bold text-base">Desafios e Gamificação</h3>
            <p className="text-xs text-muted-foreground">
              Missões diárias e semanais para manter seu hábito reciclador sempre ativo.
            </p>
          </div>
        </div>
      </section>

      {/* Form de Contato */}
      <section className="bg-muted/40 border rounded-2xl p-8 max-w-xl mx-auto space-y-4">
        <h3 className="text-xl font-bold text-center">Fale Conosco</h3>
        <form onSubmit={handleContact} className="space-y-3">
          <Input
            placeholder="Seu nome"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Seu e-mail"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Sua mensagem..."
            value={contactMsg}
            onChange={(e) => setContactMsg(e.target.value)}
            className="w-full h-24 p-3 rounded-lg border bg-background text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
          <Button
            type="submit"
            disabled={loadingMsg}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
          >
            {loadingMsg ? 'Enviando...' : 'Enviar Mensagem'}
          </Button>
        </form>
      </section>
    </div>
  )
}
