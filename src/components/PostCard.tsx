import { useState } from 'react'
import { Heart, MessageCircle, Share2, Recycle, Sparkles, Send } from 'lucide-react'
import { Post, Comment } from '@/types'
import { likePost, getComments, addComment } from '@/services/posts'
import { useAuth } from '@/hooks/use-auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { user } = useAuth()
  const [likesCount, setLikesCount] = useState(post.likes_count || 0)
  const [isLiked, setIsLiked] = useState(post.is_liked || false)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loadingComments, setLoadingComments] = useState(false)

  const authorName = post.expand?.user_id?.name || 'Guardião Verde'
  const authorAvatar = post.expand?.user_id?.avatar

  const handleLike = async () => {
    if (!user) {
      toast.error('Faça login para interagir!')
      return
    }
    const liked = await likePost(post.id, user.id)
    setIsLiked(liked)
    setLikesCount((prev) => (liked ? prev + 1 : Math.max(0, prev - 1)))
  }

  const handleToggleComments = async () => {
    if (!showComments) {
      setLoadingComments(true)
      try {
        const fetched = await getComments(post.id)
        setComments(fetched)
      } catch {
        /* intentionally ignored */
      }
      setLoadingComments(false)
    }
    setShowComments(!showComments)
  }

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newComment.trim()) return
    try {
      const created = await addComment(post.id, user.id, newComment.trim())
      setComments([...comments, created])
      setNewComment('')
      toast.success('Comentário enviado!')
    } catch (e) {
      toast.error('Erro ao enviar comentário.')
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copiado para a área de transferência!')
  }

  return (
    <div className="bg-card border rounded-xl p-4 md:p-5 shadow-sm space-y-3 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-emerald-500">
            <AvatarImage
              src={
                authorAvatar
                  ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/users/${post.user_id}/${authorAvatar}`
                  : undefined
              }
            />
            <AvatarFallback className="bg-emerald-100 text-emerald-800 font-bold">
              {authorName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
              {authorName}
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            </h4>
            <p className="text-xs text-muted-foreground">Comunidade ReClapp</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-full font-medium capitalize border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
          <Recycle className="w-3 h-3 text-emerald-600" />
          {post.category}
        </span>
      </div>

      <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{post.content}</p>

      {post.image && (
        <div className="rounded-lg overflow-hidden border max-h-80 bg-muted">
          <img
            src={`${import.meta.env.VITE_POCKETBASE_URL}/api/files/posts/${post.id}/${post.image}`}
            alt="Anexo sustentável"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t text-muted-foreground text-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 font-medium transition-colors ${isLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-500'}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
            <span>{likesCount}</span>
          </button>
          <button
            onClick={handleToggleComments}
            className="flex items-center gap-1.5 font-medium hover:text-emerald-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{comments.length || post.comments_count || 0}</span>
          </button>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>Compartilhar</span>
        </button>
      </div>

      {showComments && (
        <div className="pt-3 border-t space-y-3 bg-muted/30 -mx-4 -mb-4 p-4 rounded-b-xl">
          {loadingComments ? (
            <p className="text-xs text-center text-muted-foreground">Carregando comentários...</p>
          ) : comments.length === 0 ? (
            <p className="text-xs text-center text-muted-foreground">
              Nenhum comentário ainda. Seja o primeiro!
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {comments.map((c) => (
                <div key={c.id} className="text-xs bg-card p-2.5 rounded-lg border">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 mr-2">
                    {c.expand?.user_id?.name || 'Guardião'}:
                  </span>
                  <span>{c.content}</span>
                </div>
              ))}
            </div>
          )}

          {user && (
            <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-1">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escreva um comentário positivo..."
                className="text-xs h-8 bg-card"
              />
              <Button
                type="submit"
                size="sm"
                className="h-8 px-3 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
