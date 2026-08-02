import { useEffect, useState } from 'react'
import { getNotifications, markAllNotificationsRead } from '@/services/notifications'
import { NotificationItem } from '@/types'
import { useAuth } from '@/hooks/use-auth'
import { Bell, CheckCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Notifications() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  useEffect(() => {
    if (user) {
      getNotifications(user.id)
        .then(setNotifications)
        .catch(() => {})
    }
  }, [user])

  const handleMarkAllRead = async () => {
    if (!user) return
    await markAllNotificationsRead(user.id)
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <Bell className="w-6 h-6 text-emerald-600" />
          Suas Notificações
        </h1>
        <Button onClick={handleMarkAllRead} variant="outline" size="sm" className="text-xs gap-1">
          <CheckCheck className="w-3.5 h-3.5" /> Marcar Lidas
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-center py-8 text-xs text-muted-foreground">
            Nenhuma notificação por enquanto.
          </p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl border transition-all ${!n.read ? 'bg-emerald-50/50 border-emerald-300' : 'bg-card'}`}
            >
              <h4 className="font-bold text-sm">{n.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
