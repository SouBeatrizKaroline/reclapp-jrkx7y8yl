import { useEffect, useState } from 'react'
import { getDiyTutorials, createDiyTutorial } from '@/services/diy'
import { DiyTutorial } from '@/types'
import { useAuth } from '@/hooks/use-auth'
import { DiyCard } from '@/components/DiyCard'
import { Hammer, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

export default function Diy() {
  const { user } = useAuth()
  const [tutorials, setTutorials] = useState<DiyTutorial[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<'decoracao' | 'utilitario' | 'brinquedo'>('utilitario')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getDiyTutorials()
      .then(setTutorials)
      .catch(() => {})
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !title || !description) return
    try {
      await createDiyTutorial({
        user_id: user.id,
        title,
        description,
        category,
        difficulty: 1,
        time_estimate: '30 min',
        likes_count: 0,
      })
      toast.success('Tutorial DIY criado com sucesso!')
      setOpen(false)
      setTitle('')
      setDescription('')
      getDiyTutorials().then(setTutorials)
    } catch (e) {
      toast.error('Erro ao criar tutorial.')
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <Hammer className="w-6 h-6 text-emerald-600" />
            Ideias DIY & Reutilização Criativa
          </h1>
          <p className="text-xs text-muted-foreground">
            Transforme lixo em peças incríveis para o seu dia a dia.
          </p>
        </div>

        {user && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5"
              >
                <Plus className="w-4 h-4" /> Criar DIY
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Publicar novo tutorial DIY</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 pt-2">
                <Input
                  placeholder="Título do projeto"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Descrição passo a passo..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-24 p-3 border rounded-lg text-xs"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 text-white font-bold text-xs"
                >
                  Publicar Projeto
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tutorials.map((diy) => (
          <DiyCard key={diy.id} diy={diy} />
        ))}
      </div>
    </div>
  )
}
