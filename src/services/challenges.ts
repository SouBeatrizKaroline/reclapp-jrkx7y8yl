import pb from '@/lib/pocketbase/client'
import { Challenge } from '@/types'

export const getChallenges = async () => {
  return pb.collection('challenges').getFullList<Challenge>({
    filter: 'active = true',
    sort: 'reward_points',
  })
}

export const getUserChallenges = async (userId: string) => {
  return pb.collection('user_challenges').getFullList({
    filter: `user_id = "${userId}"`,
    expand: 'challenge_id',
  })
}

export const completeChallenge = async (
  userId: string,
  challengeId: string,
  rewardPoints: number,
) => {
  const existing = await pb.collection('user_challenges').getList(1, 1, {
    filter: `user_id = "${userId}" && challenge_id = "${challengeId}"`,
  })

  if (existing.items.length > 0) {
    await pb
      .collection('user_challenges')
      .update(existing.items[0].id, { completed: true, progress: 100 })
  } else {
    await pb.collection('user_challenges').create({
      user_id: userId,
      challenge_id: challengeId,
      progress: 100,
      completed: true,
    })
  }

  const user = await pb.collection('users').getOne(userId)
  const currentPoints = user.eco_points || 0
  const currentExp = user.experience || 0
  await pb.collection('users').update(userId, {
    eco_points: currentPoints + rewardPoints,
    experience: currentExp + rewardPoints * 2,
  })
}
