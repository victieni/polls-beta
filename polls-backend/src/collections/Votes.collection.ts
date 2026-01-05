// src/collections/Votes.ts
import type { CollectionConfig } from 'payload'

export const Votes: CollectionConfig = {
  slug: 'votes',
  admin: {
    useAsTitle: 'id', // Use ID as title since privacy-focused
    // group: 'Polls', // Group with Polls
    // hidden: true, // Hide from main navigation for security
    // listSearchableFields: [], // Disable search for privacy
    // description: 'Private vote records; access restricted to poll creators.',
  },
  access: {
    // High privacy: Only poll creator can read; voters can create if allowed
    // create: ({ req: { user }, data }) => {
    //   // Validate based on poll settings (use hook for full check)
    //   return true // Placeholder
    // },
    // read: ({ req: { user }, doc }) => user && doc.poll?.creator?.id === user.id,
    // update: () => false, // No updates to votes
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
    },
    {
      name: 'option',
      type: 'relationship',
      relationTo: 'poll-options',
      required: true,
    },
    {
      name: 'voter',
      type: 'relationship',
      relationTo: 'users',
      // ! Optional for anonymous votes
    },
    {
      name: 'voteHash',
      type: 'text',
      // For anonymized uniqueness (e.g., hash of IP/device)
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'metadata',
      type: 'json', // Additional proofs like geolocation if enabled
    },
    { name: 'isValid', type: 'checkbox', defaultValue: false },
  ],

  versions: false, // No versions for votes to save space
  // indexes: [
  //   { fields: { poll: 1, voter: 1 }, unique: true }, // Prevent duplicate votes
  //   { fields: { poll: 1, voteHash: 1 }, unique: true }, // For anonymous
  // ],
  // hooks: {
  //   beforeChange: [
  //     // Validate vote: Check if poll is open, user hasn't voted, etc.
  //     async ({ req, data, operation }) => {
  //       if (operation === 'create') {
  //         const poll = await req.payload.findByID({ collection: 'polls', id: data.poll })
  //         if (poll.status !== 'open') throw new Error('Poll is not open')
  //         // Add more validations: max votes, etc.
  //         if (!data.voter && poll.allowAnonymous) {
  //           data.voteHash = 'generated-hash' // Implement hashing logic
  //         }
  //       }
  //       return data
  //     },
  //   ],
  //   afterOperation: [
  //     // Log to AuditLogs
  //     async ({ operation, result, req }) => {
  //       if (operation === 'create') {
  //         await req.payload.create({
  //           collection: 'audit-logs',
  //           data: {
  //             actionType: 'cast_vote',
  //             entityId: result.id,
  //             user: req.user?.id,
  //             details: { poll: result.poll },
  //           },
  //         })
  //       }
  //     },
  //   ],
  // },
}
