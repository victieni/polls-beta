import type { CollectionConfig } from 'payload'
import { ePollStatus, ePollType } from 'typescript/enum'

export const Polls: CollectionConfig = {
  slug: 'polls',
  admin: {
    useAsTitle: 'title', // Use title as document title
    // group: 'Polls', // Group in navigation
    // defaultColumns: ['title', 'status', 'creator'], // Default list columns
    // listSearchableFields: ['title', 'description'], // Searchable fields
    // description: 'Manage polls and votes with admin controls.', // Admin description
    // preview: (doc) => `/polls/${doc.id}`, // Example preview URL
  },
  access: {
    // Creator has full control; others can read public polls
    create: ({ req: { user } }) => !!user, // Logged-in users can create
    // read: ({ req: { user,  } }) => doc.isPublic || (user && doc.creator?.id === user.id),
    read: () => true,
    // update: ({ req: { user }, doc }) => user && doc.creator?.id === user.id,
    // delete: ({ req: { user }, doc }) => user && doc.creator?.id === user.id,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'about',
      type: 'richText',
    },
    {
      name: 'administration',
      type: 'group',
      fields: [
        {
          name: 'creator',
          type: 'relationship',
          relationTo: 'users',
          required: true,
          admin: { readOnly: true },
        },
        { name: 'admins', type: 'relationship', relationTo: 'users', hasMany: true, maxRows: 3 },
      ],
    },
    // ? Helps in search
    { name: 'tags', type: 'text', hasMany: true },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'allowAnonymous',
      type: 'checkbox',
      defaultValue: false,
    },
    { name: 'showProgress', type: 'checkbox', defaultValue: true },
    { name: 'isEditable', type: 'checkbox', defaultValue: true },

    {
      name: 'status',
      type: 'select',
      options: Object.values(ePollStatus).map((status) => ({ label: status, value: status })),
      defaultValue: ePollStatus.DRAFT,
    },
    {
      name: 'pollType',
      type: 'select',
      options: Object.values(ePollType).map((t) => ({ label: t, value: t })),
      defaultValue: ePollType.SIMPLE,
    },
    {
      name: 'maxVotesPerUser',
      type: 'number',
      defaultValue: 1,
      admin: { readOnly: true },
    },
    // ? Only For Private
    {
      name: 'registration',
      type: 'group',
      fields: [
        {
          name: 'voters',
          type: 'array',
          fields: [
            { name: 'registrationId', type: 'text', required: true },
            { name: 'isApproved', type: 'checkbox', defaultValue: false },
            { name: 'user', type: 'relationship', relationTo: 'users' },
          ],
        },
        { name: 'validRegistrationIds', type: 'text', hasMany: true },
      ],
    },

    // {
    //   name: 'customSettings',
    //   type: 'json', // Flexible JSON for extensible settings like vote weighting
    // },
  ],

  versions: true, // Enable versioning for audits
  trash: true, // Soft delete for recovery
  defaultSort: '-createdAt', // Sort by newest first
  // indexes: [
  //   { fields: { creator: 1, status: 1 } }, // Compound index for queries
  // ],
  // hooks: {
  //   beforeChange: [
  //     // Validate start/end dates
  //     async ({ data:value, operation }) => {
  //       if (
  //         operation === 'update' &&
  //         value.startDate &&
  //         value.endDate &&
  //         new Date(value.startDate) > new Date(value.endDate)
  //       ) {
  //         throw new Error('Start date must be before end date')
  //       }
  //       return value
  //     },
  //   ],
  //   afterOperation: [
  //     // Example: Log changes to AuditLogs
  //     async ({ operation, result, req }) => {
  //       if (operation === 'create' || operation === 'update') {
  //         await req.payload.create({
  //           collection: 'audit-logs',
  //           data: {
  //             actionType: operation === 'create' ? 'create_poll' : 'update_poll',
  //             entityId: result.id,
  //             user: req.user?.id,
  //             details: { changes: result },
  //           },
  //         })
  //       }
  //     },
  //   ],
  // },
}
