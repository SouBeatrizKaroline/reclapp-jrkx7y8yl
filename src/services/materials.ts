import pb from '@/lib/pocketbase/client'
import { Material } from '@/types'

export const getMaterials = async () => {
  return pb.collection('materials').getFullList<Material>({
    sort: 'name',
  })
}

export const getMaterialByCategory = async (category: string) => {
  const list = await pb.collection('materials').getList<Material>(1, 1, {
    filter: `category = "${category}"`,
  })
  return list.items[0] || null
}
