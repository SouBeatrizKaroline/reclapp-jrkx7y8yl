import pb from '@/lib/pocketbase/client'
import { Post, Comment } from '@/types'

export const getPosts = async (category?: string) => {
  const filter = category && category !== 'todos' ? `category = "${category}"` : ''
  const records = await pb.collection('posts').getFullList<Post>({
    filter,
    sort: '-created',
    expand: 'user_id',
  })
  return records
}

export const createPost = async (
  formData: FormData | { content: string; category: string; user_id: string },
) => {
  return pb.collection('posts').create<Post>(formData, { expand: 'user_id' })
}

export const likePost = async (postId: string, userId: string) => {
  const existing = await pb.collection('likes').getList(1, 1, {
    filter: `post_id = "${postId}" && user_id = "${userId}"`,
  })
  if (existing.items.length > 0) {
    await pb.collection('likes').delete(existing.items[0].id)
    const post = await pb.collection('posts').getOne<Post>(postId)
    const newCount = Math.max(0, (post.likes_count || 1) - 1)
    await pb.collection('posts').update(postId, { likes_count: newCount })
    return false
  } else {
    await pb.collection('likes').create({ post_id: postId, user_id: userId })
    const post = await pb.collection('posts').getOne<Post>(postId)
    const newCount = (post.likes_count || 0) + 1
    await pb.collection('posts').update(postId, { likes_count: newCount })
    return true
  }
}

export const getComments = async (postId: string) => {
  return pb.collection('comments').getFullList<Comment>({
    filter: `post_id = "${postId}"`,
    sort: 'created',
    expand: 'user_id',
  })
}

export const addComment = async (postId: string, userId: string, content: string) => {
  const comment = await pb.collection('comments').create<Comment>(
    {
      post_id: postId,
      user_id: userId,
      content,
    },
    { expand: 'user_id' },
  )

  const post = await pb.collection('posts').getOne<Post>(postId)
  await pb.collection('posts').update(postId, { comments_count: (post.comments_count || 0) + 1 })
  return comment
}
