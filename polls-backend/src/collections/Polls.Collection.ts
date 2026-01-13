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
    // read: ({ req: { user,  } }) => doc.isPublic || (user && doc.creator?.id === user.id),
    // update: ({ req: { user }, doc }) => user && doc.creator?.id === user.id,
    // delete: ({ req: { user }, doc }) => user && doc.creator?.id === user.id,
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  // todo Add "Allow Custom Response" Field
  // todo Create "Custom Response" Collection - figure out how to make it Anonymous.
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    { name: 'prompt', type: 'text', required: true },
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
      name: 'isPrivate',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'isMultipleChoice',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'allowAnonymous',
      type: 'checkbox',
      defaultValue: false,
    },
    { name: 'allowCustomResponse', type: 'checkbox', defaultValue: true },
    { name: 'hideProgress', type: 'checkbox', defaultValue: false },
    { name: 'isEditable', type: 'checkbox', defaultValue: true },
    {
      name: 'status',
      type: 'select',
      options: Object.values(ePollStatus).map((status) => ({ label: status, value: status })),
      defaultValue: ePollStatus.DRAFT,
    },
    {
      name: 'type',
      type: 'select',
      options: Object.values(ePollType).map((t) => ({ label: t, value: t })),
      defaultValue: ePollType.SIMPLE,
    },

    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'followers', type: 'relationship', relationTo: 'users', hasMany: true },
        { name: 'bookmarks', type: 'relationship', relationTo: 'users', hasMany: true },
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
  hooks: {
    beforeRead: [
      async (d) => {
        try {
        } catch (error: any) {
          throw new Error(error)
        }
      },
    ],
    beforeChange: [
      // ? Validate start/end dates
      async ({ data: value, operation }) => {
        if (
          operation === 'update' &&
          value.startDate &&
          value.endDate &&
          new Date(value.startDate) > new Date(value.endDate)
        ) {
          throw new Error('Start date must be before end date')
        }
        return value
      },
    ],
    afterOperation: [
      // ? Example: Log changes to AuditLogs
      // async ({ operation, result, req }) => {
      //   if (operation === 'create' || operation === 'update') {
      //     await req.payload.create({
      //       collection: 'audit-logs',
      //       data: {
      //         actionType: operation === 'create' ? 'create_poll' : 'edit_option',
      //         entityId: result.id,
      //         user: req.user?.id,
      //         details: { changes: result },
      //       },
      //     })
      //   }
      // },
    ],
  },
}
