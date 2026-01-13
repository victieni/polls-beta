import { CollectionConfig } from 'payload'

export const Registration: CollectionConfig = {
  slug: 'registration',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  // todo In client, Limit Duplication registration to Same Poll.
  fields: [
    {
      name: 'poll',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true, // ! One-to-one with Polls -> poll can have only one registration.
    },
    { name: 'prompt', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'voters',
      type: 'array',
      fields: [
        { name: 'registrationId', type: 'text', required: true },
        { name: 'isApproved', type: 'checkbox', defaultValue: false },
        { name: 'user', type: 'relationship', relationTo: 'users' },
      ],
    },
    // ? Allow Automatic Verification`
    { name: 'validRegistrationIds', type: 'text', hasMany: true },
  ],
}
