export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  bio?: string
  city?: string
  state?: string
  country?: string
  level?: number
  experience?: number
  eco_points?: number
  streak_days?: number
  onboarding_complete?: boolean
  interests?: string[]
  goal?: string
  experience_level?: string
  role?: 'user' | 'municipio_admin' | 'empresa_admin' | 'escola_admin'
  created?: string
  updated?: string
}

export interface Post {
  id: string
  user_id: string
  content: string
  image?: string
  category: 'reciclagem' | 'diy' | 'dica' | 'evento' | 'campanha'
  likes_count?: number
  comments_count?: number
  expand?: {
    user_id?: User
  }
  is_liked?: boolean
  created?: string
  updated?: string
}

export interface Comment {
  id: string
  post_id: string
  user_id: string
  content: string
  expand?: {
    user_id?: User
  }
  created?: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  type: 'diario' | 'semanal' | 'mensal' | 'especial' | 'cidade' | 'escola' | 'empresa' | 'global'
  difficulty: number
  reward_points: number
  active: boolean
  progress?: number
  completed?: boolean
  created?: string
}

export interface Material {
  id: string
  name: string
  icon: string
  category:
    | 'papel'
    | 'vidro'
    | 'metal'
    | 'plastico'
    | 'oleo'
    | 'eletronicos'
    | 'pilhas'
    | 'madeira'
    | 'tecido'
  how_to_recycle?: string
  how_to_reuse?: string
  fun_facts?: string[]
  environmental_impact?: string
}

export interface EcoPonto {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  phone?: string
  hours?: string
  materials_accepted: string[]
  rating?: number
  status: 'pending' | 'approved' | 'rejected'
  added_by?: string
}

export interface DiyTutorial {
  id: string
  title: string
  description: string
  category: 'decoracao' | 'utilitario' | 'brinquedo' | 'moda' | 'jardim' | 'outros'
  difficulty: number
  time_estimate: string
  materials: { name: string; quantity: string }[]
  steps: { step_number: number; title: string; description: string }[]
  cover_image?: string
  user_id: string
  likes_count?: number
  expand?: {
    user_id?: User
  }
  created?: string
}

export interface NotificationItem {
  id: string
  user_id: string
  type: string
  title: string
  message: string
  read: boolean
  created?: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: 'reciclagem' | 'educacao' | 'social' | 'desafios' | 'especial'
}
