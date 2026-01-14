// src/collections/Results.ts
import type { CollectionConfig } from 'payload'

export const Results: CollectionConfig = {
  slug: 'results',
  admin: {
    useAsTitle: 'poll', // Title based on related poll
    // group: 'Polls',
    // defaultColumns: ['poll', 'announcementDate', 'isPublished'],
    // description: 'Announce poll results; computed aggregates.',
  },
  access: {
    // Creator controls; public read for published
    // create: ({ req: { user }, data }) => user && data.poll?.creator?.id === user.id,
    // read: ({ doc }) => doc.isPublished,
    // update: ({ req: { user }, doc }) => user && doc.poll?.creator?.id === user.id,
    // delete: ({ req: { user }, doc }) => user && doc.poll?.creator?.id === user.id,
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'poll',
      type: 'relationship',
      relationTo: 'polls',
      required: true,
      unique: true, // One result per poll
    },
    {
      name: 'announcementDate',
      type: 'date',
    },
    {
      name: 'summary',
      type: 'json', // Vote counts, percentages, winners
    },
    {
      name: 'announcementMessage',
      type: 'richText', // Custom narrative
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
    },
  ],

  versions: true, // For historical announcements
  // hooks: {
  //   afterOperation: [
  //     // Example: Compute summary on create/update
  //     async ({ operation, result, req }) => {
  //       if (operation === 'create' || operation === 'update') {
  //         // Query votes, aggregate, save to summary
  //         // Implement aggregation logic here
  //         await req.payload.create({
  //           collection: 'audit-logs',
  //           data: {
  //             actionType: 'announce_results',
  //             entityId: result.id,
  //             user: req.user?.id,
  //           },
  //         })
  //       }
  //     },
  //   ],
  // },
}
