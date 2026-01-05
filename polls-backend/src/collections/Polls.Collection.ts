// src/collections/Polls.ts
import type { CollectionConfig } from 'payload'
import { ePollStatus } from '../../../typescript/enum'

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
    // create: ({ req: { user } }) => !!user, // Logged-in users can create
    // read: ({ req: { user }, doc }) => doc.isPublic || (user && doc.creator?.id === user.id),
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
      type: 'richText',
    },
    {
      name: 'creator',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      defaultValue: ({ user }) => user?.id, // Auto-set to current user
      admin: {
        readOnly: true, // Prevent editing creator
      },
    },
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
      name: 'status',
      type: 'select',
      options: Object.values(ePollStatus).map((status) => ({ label: status, value: status })),
      // options: [
      //   { label: 'Draft', value: 'draft' },
      //   { label: 'Open', value: 'open' },
      //   { label: 'Closed', value: 'closed' },
      //   { label: 'Archived', value: 'archived' },
      // ],
      defaultValue: 'draft',
    },
    {
      name: 'pollType',
      type: 'select',
      options: [
        { label: 'Simple Poll', value: 'simple_poll' },
        { label: 'Election', value: 'election' },
        { label: 'Survey', value: 'survey' },
      ],
      defaultValue: 'simple_poll',
    },
    {
      name: 'options',
      type: 'relationship',
      relationTo: 'poll-options',
      hasMany: true,
    },
    {
      name: 'maxVotesPerUser',
      type: 'number',
      defaultValue: 1,
    },
    {
      name: 'allowAnonymous',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'customSettings',
      type: 'json', // Flexible JSON for extensible settings like vote weighting
    },
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
  //     async ({ value, operation }) => {
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
