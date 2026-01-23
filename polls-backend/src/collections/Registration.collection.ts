import { CollectionConfig } from 'payload'
import { eRegistrationsStatus } from 'typescript/enum'

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
      relationTo: 'polls',
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
        {
          name: 'status',
          type: 'select',
          options: Object.entries(eRegistrationsStatus).map(([label, value]) => ({ label, value })),
          defaultValue: eRegistrationsStatus.PENDING,
        },
        { name: 'user', type: 'relationship', relationTo: 'users', required: true },
      ],
    },
    // todo Allow Automatic Verification
    // todo Allow creator to Invite via Usernames and rename this field accordingly
    { name: 'validRegistrationIds', type: 'text', hasMany: true },
  ],
}
