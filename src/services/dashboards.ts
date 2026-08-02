import pb from '@/lib/pocketbase/client'

export const getRanking = async () => {
  return pb.collection('users').getFullList({
    sort: '-eco_points',
    fields: 'id,name,avatar,level,eco_points,streak_days,city,role',
  })
}

export const sendContactMessage = async (name: string, email: string, message: string) => {
  return pb.collection('contacts').create({ name, email, message })
}
