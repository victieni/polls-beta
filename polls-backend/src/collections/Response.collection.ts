import { CollectionConfig } from 'payload'

export const Responses: CollectionConfig = {
  slug: 'responses',
  access: {},
  // Todo Create Hook to convert user ID to userHash
  fields: [
    { name: 'user', type: 'relationship', relationTo: 'users' },
    { name: 'userHash', type: 'text', unique: true, required: true, admin: { readOnly: true } },
    {
      name: 'poll',
      type: 'relationship',
      relationTo: 'polls',
      required: true,
      admin: { readOnly: true },
    },
    { name: 'body', type: 'textarea', required: true },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'likes', type: 'relationship', relationTo: 'users', hasMany: true },
        { name: 'dislikes', type: 'relationship', relationTo: 'users', hasMany: true },
      ],
    },
  ],
}
