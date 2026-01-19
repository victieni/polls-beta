import { auth } from '@clerk/nextjs/server'
import { AuthStrategy } from 'payload'

export const ClerkAuthStrategy: AuthStrategy = {
  name: 'clerk-auth-strategy',
  authenticate: async ({ payload }) => {
    const { userId: clerkId } = await auth()

    if (!clerkId) return { user: null }

    const {
      docs: [user],
    } = await payload.find({
      collection: 'users',
      where: {
        clerkId: { equals: clerkId },
      },
      limit: 1,
    })

    return {
      user: {
        collection: 'users',
        ...user,
      },
    }
  },
}
