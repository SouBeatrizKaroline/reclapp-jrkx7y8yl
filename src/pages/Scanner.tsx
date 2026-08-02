import { useState } from 'react'
import pb from '@/lib/pocketbase/client'
import { Camera, Sparkles, CheckCircle2, Recycle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function Scanner() {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim()) return
    setLoading(true)
    try {
      const res = await pb.send('/backend/v1/scan-material', {
        method: 'POST',
        body: JSON.stringify({ description }),
        headers: { 'Content-Type': 'application/json' },
      })
      setResult(res)
      toast.success('Material identificado pela Inteligência Artificial!')
    } catch (e) {
      toast.error('Erro na análise. Tente novamente.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
          <Camera className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold">Scanner Inteligente ReClapp</h1>
        <p className="text-xs text-muted-foreground">
          Descreva ou envie uma foto do resíduo para análise instantânea
        </p>
      </div>

      <form onSubmit={handleScan} className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
        <Input
          placeholder="Ex: Garrafa PET transparente com tampa azul"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 gap-2"
        >
          <Sparkles className="w-4 h-4" /> {loading ? 'Analisando com IA...' : 'Analisar Material'}
        </Button>
      </form>

      {result && (
        <div className="bg-card border rounded-2xl p-6 space-y-4 shadow-md animate-fade-in-up">
          <div className="flex items-center gap-3 border-b pb-3">
            <Recycle className="w-8 h-8 text-emerald-600" />
            <div>
              <h3 className="font-bold text-lg">{result.material}</h3>
              <p className="text-xs text-muted-foreground capitalize">
                Categoria: {result.category}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-emerald-700">Instruções de Descarte:</h4>
            <p className="bg-emerald-50 p-3 rounded-xl text-emerald-900 border border-emerald-200">
              {result.recycling_instructions}
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-700">Ideia DIY:</h4>
            <p className="bg-amber-50 p-3 rounded-xl text-amber-900 border border-amber-200">
              {result.diy_idea}
            </p>
          </div>

          <div className="p-3 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl text-center text-xs font-bold text-yellow-800">
            Recompensa estimada: +{result.eco_points || 30} EcoPoints ao reciclar!
          </div>
        </div>
      )}
    </div>
  )
}
