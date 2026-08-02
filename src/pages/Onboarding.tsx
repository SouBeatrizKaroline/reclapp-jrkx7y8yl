import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [city, setCity] = useState('São Paulo')
  const [goal, setGoal] = useState('Reciclar toda semana')
  const [interests, setInterests] = useState<string[]>(['Reciclagem', 'DIY'])
  const { updateProfile } = useAuth()
  const navigate = useNavigate()

  const toggleInterest = (item: string) => {
    setInterests((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const handleFinish = async () => {
    await updateProfile({
      city,
      goal,
      interests,
      onboarding_complete: true,
    })
    toast.success('Onboarding concluído! Ganhou +50 EcoPoints!')
    navigate('/feed')
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4 space-y-6">
      <div className="flex justify-between items-center text-xs font-bold text-muted-foreground">
        <span>Passo {step} de 3</span>
        <span>{step === 1 ? 'Interesses' : step === 2 ? 'Sua Cidade' : 'Sua Meta'}</span>
      </div>

      {step === 1 && (
        <div className="bg-card border rounded-xl p-6 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold">Quais são seus principais interesses?</h2>
          <p className="text-xs text-muted-foreground">Selecione para personalizarmos seu feed.</p>
          <div className="grid grid-cols-2 gap-3">
            {['Reciclagem', 'DIY & Arte', 'Educação', 'Eventos', 'Comunidade', 'Campanhas'].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => toggleInterest(item)}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${interests.includes(item) ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'hover:border-gray-300'}`}
                >
                  <span>{item}</span>
                  {interests.includes(item) && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              ),
            )}
          </div>
          <Button
            onClick={() => setStep(2)}
            className="w-full bg-emerald-600 text-white font-bold text-xs h-10 mt-4"
          >
            Próximo
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-card border rounded-xl p-6 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold">Onde você mora?</h2>
          <p className="text-xs text-muted-foreground">
            Usaremos isso para mostrar os ecopontos da sua região.
          </p>
          <Input
            placeholder="Sua Cidade (ex: São Paulo)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Button
            onClick={() => setStep(3)}
            className="w-full bg-emerald-600 text-white font-bold text-xs h-10 mt-4"
          >
            Próximo
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="bg-card border rounded-xl p-6 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold">Qual é seu objetivo principal?</h2>
          <div className="space-y-2">
            {[
              'Reciclar toda semana',
              'Aprender mais sobre materiais',
              'Participar de mutirões',
              'Reduzir desperdício',
            ].map((g) => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition-all ${goal === g ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'hover:border-gray-300'}`}
              >
                {g}
              </button>
            ))}
          </div>
          <Button
            onClick={handleFinish}
            className="w-full bg-emerald-600 text-white font-bold text-xs h-10 mt-4 gap-2"
          >
            <Sparkles className="w-4 h-4" /> Concluir e Ganhar Recompensa
          </Button>
        </div>
      )}
    </div>
  )
}
