import pb from '@/lib/pocketbase/client'
import { DiyTutorial } from '@/types'

export const getDiyTutorials = async () => {
  return pb.collection('diy_tutorials').getFullList<DiyTutorial>({
    sort: '-created',
    expand: 'user_id',
  })
}

export const createDiyTutorial = async (formData: FormData | Partial<DiyTutorial>) => {
  return pb.collection('diy_tutorials').create<DiyTutorial>(formData)
}
