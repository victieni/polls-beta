import { ClerkAuthStrategy } from 'lib/clerkAuthStrategy'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    disableLocalStrategy: true,
    strategies: [ClerkAuthStrategy],
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'clerkId',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'fname',
      type: 'text',
      required: true,
    },
    {
      name: 'lname',
      type: 'text',
      required: true,
    },
    { name: 'username', type: 'text', required: true, unique: true },
    {
      name: 'imageUrl',
      type: 'text',
    },

    {
      name: 'meta',
      type: 'group',
      fields: [{ name: 'followers', type: 'relationship', relationTo: 'users', hasMany: true }],
    },
  ],
}
