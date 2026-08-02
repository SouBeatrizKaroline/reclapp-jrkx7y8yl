import { useEffect, useState } from 'react'
import { getPosts, createPost } from '@/services/posts'
import { Post } from '@/types'
import { useAuth } from '@/hooks/use-auth'
import { PostCard } from '@/components/PostCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Image, Send, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { useRealtime } from '@/hooks/use-realtime'

export default function Feed() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<'reciclagem' | 'diy' | 'dica' | 'evento' | 'campanha'>(
    'reciclagem',
  )
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setLoadingSubmitting] = useState(false)

  const fetchPosts = async () => {
    try {
      const list = await getPosts()
      setPosts(list)
    } catch {
      /* intentionally ignored */
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  useRealtime('posts', () => {
    fetchPosts()
  })

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !content.trim()) return
    setLoadingSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('user_id', user.id)
      formData.append('content', content.trim())
      formData.append('category', category)
      if (image) formData.append('image', image)

      await createPost(formData)
      setContent('')
      setImage(null)
      toast.success('Publicado com sucesso! +10 EcoPoints')
      fetchPosts()
    } catch (e) {
      toast.error('Erro ao publicar post.')
    }
    setLoadingSubmitting(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {user && (
        <form
          onSubmit={handleCreatePost}
          className="bg-card border rounded-2xl p-4 shadow-sm space-y-3"
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Compartilhe uma ação ecológica, dica ou conquista..."
            className="w-full h-20 p-3 bg-muted/40 rounded-xl text-xs outline-none focus:ring-2 focus:ring-emerald-500 border"
          />
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <label className="p-2 hover:bg-muted rounded-lg cursor-pointer text-muted-foreground hover:text-emerald-600 transition-colors">
                <Image className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="text-xs bg-muted/50 border rounded-lg px-2.5 py-1.5 font-medium"
              >
                <option value="reciclagem">Reciclagem</option>
                <option value="diy">DIY / Arte</option>
                <option value="dica">Dica Verde</option>
                <option value="evento">Evento</option>
              </select>
            </div>
            <Button
              type="submit"
              disabled={submitting}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5"
            >
              <span>Publicar</span>
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-center text-xs text-muted-foreground py-8">
          Carregando feed da comunidade...
        </p>
      ) : posts.length === 0 ? (
        <div className="bg-card border rounded-2xl p-8 text-center space-y-3">
          <Sparkles className="w-10 h-10 text-emerald-500 mx-auto" />
          <h3 className="font-bold text-base">Seja o primeiro a publicar!</h3>
          <p className="text-xs text-muted-foreground">
            Compartilhe sua reciclagem de hoje com a comunidade ReClapp.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
