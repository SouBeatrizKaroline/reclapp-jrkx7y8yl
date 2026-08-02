import pb from '@/lib/pocketbase/client'
import { EcoPonto } from '@/types'

export const getEcoPontos = async () => {
  return pb.collection('ecopontos').getFullList<EcoPonto>({
    filter: 'status = "approved"',
  })
}

export const createEcoPonto = async (data: Partial<EcoPonto>) => {
  return pb.collection('ecopontos').create<EcoPonto>({
    ...data,
    status: 'pending',
  })
}
