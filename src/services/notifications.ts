import pb from '@/lib/pocketbase/client'
import { NotificationItem } from '@/types'

export const getNotifications = async (userId: string) => {
  return pb.collection('notifications').getFullList<NotificationItem>({
    filter: `user_id = "${userId}"`,
    sort: '-created',
  })
}

export const markAllNotificationsRead = async (userId: string) => {
  const unread = await pb.collection('notifications').getFullList({
    filter: `user_id = "${userId}" && read = false`,
  })
  await Promise.all(
    unread.map((item) => pb.collection('notifications').update(item.id, { read: true })),
  )
}
